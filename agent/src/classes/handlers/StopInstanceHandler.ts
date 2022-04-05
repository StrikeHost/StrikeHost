import { Handler } from "./Handler";
import { StopInstanceEvent } from "../../interfaces/ServerEvents";

export class StopInstanceHandler extends Handler {
  public async dispatch(event: StopInstanceEvent) {
    const instance = this.agent.getInstance(event.instance.id);
    instance.stop();
  }
}
