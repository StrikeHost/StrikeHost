import { exit } from "process";
import { io, Socket } from "socket.io-client";
import { v4 as getIpAddress } from "public-ip";
import { cpu, diskLayout, mem } from "systeminformation";

import {
  ClientEvent,
  ClientEventName,
  SetupAgentEvent,
  RegisterAgentEvent,
} from "../interfaces/ClientEvents";
import { Database } from "./Database";
import { Instance } from "./Instance";
import { AgentInformation } from "../interfaces/AgentInformation";
import { InstanceStatusType } from "../enums/InstanceStatus";
import { Router } from "./Router";
import { Instance as InstanceInterface } from "../interfaces/Instance";
import { ServerEventName } from "interfaces/ServerEvents";

/**
 * Manages central functionality of the Game Server Agent
 */
export class Agent {
  private serverId!: string;
  private static socket: Socket;
  private instances: Record<string, Instance>;

  /**
   * Agent constructor
   */
  constructor() {
    this.instances = {};
  }

  /**
   * Retrieve server id,
   */
  public async init() {
    try {
      this.connectSocket();
    } catch {
      console.error("Error initializing agent.");
      exit();
    }

    const serverId = (await Database.getSetting("SERVER_ID")) as string;
    this.serverId = serverId;
    if (!serverId) {
      this.setup();
    } else {
      this.bootup();
    }
  }

  /**
   * Agent has already been initialized - should already server id
   */
  public async bootup() {
    const event: RegisterAgentEvent = {
      event: ClientEventName.REGISTER_AGENT,
      data: {
        agentId: this.serverId,
      },
    };

    Agent.sendEvent(event);
    this.restoreInstances();
  }

  /**
   * Restores instances from the DB and starts if neccesary
   */
  private async restoreInstances() {
    const instances = await Database.getAllInstances();

    instances.forEach((instance) => {
      this.instances[instance.id] = new Instance(instance);

      if (instance.status === InstanceStatusType.RUNNING) {
        this.instances[instance.id].start();
      }
    });
  }

  /**
   * If we don't have a server ID, register with the backend
   */
  private async setup() {
    const specs = await this.getSystemSpecs();

    const event: SetupAgentEvent = {
      event: ClientEventName.SETUP_AGENT,
      data: {
        specs,
        token: process.env.AGENT_SECRET,
        publicAddress: await getIpAddress(),
      },
    };

    Agent.sendEvent(event);
  }

  /**
   * Authenticates and connects to the backend
   */
  private connectSocket() {
    // Agent.socket.onAny((event) => {
    //   console.log(event);
    // });
    Agent.socket = io(process.env.SOCKET_SERVER_ADDRESS, {
      // extraHeaders: {
      //   Authorization: `Bearer ${process.env.AGENT_SECRET}`,
      // },
    });
    Agent.socket.onAny((event: ServerEventName | "exception", data: any) => {
      if (event !== "exception") {
        Router.handle(this, {
          event,
          ...data,
        });
      }
    });
  }

  /**
   * Get some basic system specs
   *
   * @returns {Promise<AgentInformation>}
   */
  private async getSystemSpecs(): Promise<AgentInformation> {
    const totalMem = (await mem()).total / 1_000_000; // get memory in megabytes
    const cores = (await cpu()).physicalCores;
    const diskSize = (await diskLayout())[0].size / 1_000_000_000; // get size in gigabytes

    return {
      cores,
      storage: diskSize,
      total_memory: totalMem,
    };
  }

  /**
   * Sends a message to the backend server via the websocket connection
   *
   * @param {ClientEvent} message
   * @param {string} channel
   */
  public static sendEvent(message: ClientEvent) {
    // this.socket.emit("message", message);
    const { event, data } = message;
    this.socket.emit(event, data);
  }

  public getConnection() {
    return Database;
  }

  public getServerId() {
    return this.serverId;
  }

  public setServerId(id: string) {
    this.serverId = id;
  }

  public createInstance(instance: InstanceInterface) {
    return (this.instances[instance.id] = new Instance(instance));
  }

  public getInstance(instanceId: string) {
    return this.instances[instanceId];
  }
}
