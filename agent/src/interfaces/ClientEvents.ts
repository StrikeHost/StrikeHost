import { InstanceStatusType } from "enums/InstanceStatus";
import { AgentInformation } from "./AgentInformation";

export enum ClientEventName {
  SETUP_AGENT = "agent.setup",
  BACKUP_DONE = "instance.backup.done",
  REGISTER_AGENT = "agent.register",
  INSTANCE_CONSOLE = "instance.console",
  INSTANCE_STATE_CHANGE = "instance.state_change",
  REQUEST_IMAGE_LISTINGS = "image.listings.request",
}

export interface ClientEvent {
  data?: {};
  channel?: string;
  event: ClientEventName;
}

export interface SetupAgentEvent extends ClientEvent {
  data: {
    token: string;
    publicAddress: string;
    specs: AgentInformation;
  };
}

export interface RegisterAgentEvent extends ClientEvent {
  data: {
    agentId: string;
  };
}

export interface InstanceConsoleEvent extends ClientEvent {
  data: {
    instanceId: string;
    text: string;
  };
}

export interface RequestImageListingsEvent extends ClientEvent {}

export interface InstanceStateChangeEvent extends ClientEvent {
  instanceId: string;
  status: InstanceStatusType;
}

export interface BackupDoneEvent extends ClientEvent {
  instanceId: string;
  backupId: string;
}
