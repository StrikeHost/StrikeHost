import { Process } from "./Process";

import {
  InheritableInstance,
  Instance as InstanceInterface,
} from "../interfaces/Instance";
import { Agent } from "./Agent";
import {
  ClientEventName,
  InstanceStateChangeEvent,
} from "../interfaces/ClientEvents";
import { InstanceStatusType } from "../enums/InstanceStatus";
import { Database } from "./Database";

/**
 * Represents an instance
 */
export class Instance {
  private process: Process;

  public readonly id: string;

  /**
   * The external port used to connect
   */
  public readonly port: number = 0;

  private instance: InstanceInterface;
  private inheritableInstance: InheritableInstance;

  constructor(
    instance: InstanceInterface,
    inheritableInstance: InheritableInstance
  ) {
    this.id = instance.id;
    this.port = instance.port;
    this.instance = instance;
    this.inheritableInstance = inheritableInstance;
    console.log(this.inheritableInstance);
    this.process = new Process(
      this,
      inheritableInstance.docker_name,
      instance.id,
      instance.port,
      inheritableInstance.arguments
    );
  }

  public provision() {
    this.process.provision(
      this.instance.cpus,
      this.instance.memory,
      this.instance.storage
    );
    this.changeState(InstanceStatusType.STOPPED);

    const serialized = {
      instance: this.instance,
      inheritableInstance: this.inheritableInstance,
    };

    Database.createInstance(serialized);
  }

  public async start() {
    if (this.process.isRunning()) {
      return;
    }

    this.changeState(InstanceStatusType.STARTING);
    await this.process.start();
    this.changeState(InstanceStatusType.RUNNING);
  }

  public async stop() {
    if (!this.process.isRunning()) {
      return;
    }

    this.changeState(InstanceStatusType.STOPPING);
    await this.process.stop();
    this.changeState(InstanceStatusType.STOPPED);
  }

  public async delete() {
    this.changeState(InstanceStatusType.STOPPING);
    await this.process.delete();
  }

  /**
   * Creates a backup of the instance
   */
  public async backup() {
    const id = await this.process.backup();
    return id;
  }

  /**
   * Updates the instance status
   *
   * @param {InstanceStatusType} status
   */
  private changeState(status: InstanceStatusType) {
    const event: InstanceStateChangeEvent = {
      event: ClientEventName.INSTANCE_STATE_CHANGE,
      status: status,
      instanceId: this.id,
    };

    Agent.sendEvent(event);

    this.instance.status = status;

    const serialized = {
      instance: this.instance,
      inheritableInstance: this.inheritableInstance,
    };

    Database.updateInstance(serialized);
  }
}
