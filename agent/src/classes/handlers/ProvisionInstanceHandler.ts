import { Handler } from "./Handler";
import { ProvisionInstanceEvent } from "../../interfaces/ServerEvents";

export class ProvisionInstanceHandler extends Handler {
  public async dispatch(event: ProvisionInstanceEvent) {
    const instance = this.agent.createInstance(event.instance);
    instance.provision();
  }
}
