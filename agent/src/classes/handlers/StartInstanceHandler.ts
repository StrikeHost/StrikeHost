import { Handler } from "./Handler";
import { StartInstanceEvent } from "../../interfaces/ServerEvents";

export class StartInstanceHandler extends Handler {
  public async dispatch(event: StartInstanceEvent) {
    const instance = this.agent.getInstance(event.instance.id);

    if (instance === undefined) {
      console.error("Couldn't find instance: " + event.instance.id);
      return;
    }

    instance.start();
  }
}
