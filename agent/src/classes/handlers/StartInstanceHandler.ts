import { Handler } from "./Handler";
import { StartInstanceEvent } from "../../interfaces/ServerEvents";

export class StartInstanceHandler extends Handler {
  public async dispatch(event: StartInstanceEvent) {
    const instance = this.agent.getInstance(event.instance.id);
    instance.start();
  }
}
