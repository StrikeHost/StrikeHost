import { Router } from "./classes/Router";
import { AssignAgentHandler } from "./classes/handlers/AssignAgentHandler";
import { DeleteInstanceHandler } from "./classes/handlers/DeleteInstanceHandler";
import { ProvisionInstanceHandler } from "./classes/handlers/ProvisionInstanceHandler";
import { RestartAgentHandler } from "./classes/handlers/RestartAgentHandler";
import { StartInstanceHandler } from "./classes/handlers/StartInstanceHandler";
import { StopInstanceHandler } from "./classes/handlers/StopInstanceHandler";
import { UpdateAgentHandler } from "./classes/handlers/UpdateAgentHandler";
import { ServerEventName } from "./interfaces/ServerEvents";
import { BackupInstanceHandler } from "./classes/handlers/BackupInstanceHandler";

export const initRoutes = () => {
  /**
   * Agent events
   */
  Router.add(ServerEventName.AGENT_ASSIGN, AssignAgentHandler);
  Router.add(ServerEventName.RESTART_AGENT, RestartAgentHandler);
  Router.add(ServerEventName.UPDATE_AGENT, UpdateAgentHandler);

  /**
   * Instance events
   */
  Router.add(ServerEventName.PROVISION_INSTANCE, ProvisionInstanceHandler);
  Router.add(ServerEventName.START_INSTANCE, StartInstanceHandler);
  Router.add(ServerEventName.STOP_INSTANCE, StopInstanceHandler);
  Router.add(ServerEventName.DELETE_INSTANCE, DeleteInstanceHandler);
  Router.add(ServerEventName.BACKUP_INSTANCE, BackupInstanceHandler);
};
