import { exit } from "process";

import { Handler } from "./Handler";
import { RestartAgentEvent } from "../../interfaces/ServerEvents";

export class RestartAgentHandler extends Handler {
  public async dispatch(event: RestartAgentEvent) {
    // PM2 will handle the restart
    exit();
  }
}
