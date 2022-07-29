import { Process } from "./Process";

import { Instance as InstanceInterface } from "../interfaces/Instance";
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

  constructor(instance: InstanceInterface) {
    this.id = instance.id;
    this.port = instance.port;
    this.instance = instance;
    this.process = new Process(
      this,
      instance.image.docker_name,
      instance.id,
      instance.port,
      instance.version.arguments
    );
  }

  public provision() {
    this.process.provision(
      this.instance.cpus,
      this.instance.memory,
      this.instance.storage
    );
    this.changeState(InstanceStatusType.STOPPED);
    Database.createInstance(this.instance);
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
    Database.updateInstance(this.instance);
  }
}
