import { exit } from "process";
import { execSync } from "child_process";

import { Handler } from "./Handler";
import { UpdateAgentEvent } from "../../interfaces/ServerEvents";

export class UpdateAgentHandler extends Handler {
  public async dispatch(event: UpdateAgentEvent) {
    execSync("git pull");

    // PM2 will handle the restart
    exit();
  }
}
