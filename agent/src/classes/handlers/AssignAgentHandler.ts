import { Handler } from "./Handler";
import { Database } from "../Database";
import { AssignAgentEvent } from "../../interfaces/ServerEvents";

export class AssignAgentHandler extends Handler {
  public async dispatch(event: AssignAgentEvent) {
    Database.setSetting("SERVER_ID", event.agent.id);
    this.agent.setServerId(event.agent.id);
    await this.agent.bootup();
  }
}
