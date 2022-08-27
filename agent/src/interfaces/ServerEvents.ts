import { Agent } from "./Agent";
import { InheritableInstance, Instance } from "./Instance";

export enum ServerEventName {
  RESET_AGENT = "agent.reset",
  AGENT_ASSIGN = "agent.assign",
  UPDATE_AGENT = "agent.update",
  RESTART_AGENT = "agent.restart",
  START_INSTANCE = "instance.stop",
  STOP_INSTANCE = "instance.start",
  DELETE_INSTANCE = "instance.delete",
  PROVISION_INSTANCE = "instance.provision",
  RELAY_INSTANCE_CONSOLE = "instance.console",
  INSTANCE_STATE_CHANGE = "instance.state_change",
  IMAGE_LISTINGS_RESPONSE = "image.listings.response",
}

export interface ServerEvent {
  event: ServerEventName;
}

// Server assigns agent an id, etc
export interface AssignAgentEvent extends ServerEvent {
  agent: Agent;
  nonce: string;
}

export interface StartInstanceEvent extends ServerEvent {
  instance: Instance;
}

export interface StopInstanceEvent extends ServerEvent {
  instance: Instance;
}

export interface ProvisionInstanceEvent extends ServerEvent {
  instance: Instance;
  inheritableInstance: InheritableInstance;
}

export interface DeleteInstanceEvent extends ServerEvent {
  instance: Instance;
}

export interface RestartAgentEvent extends ServerEvent {}
export interface ResetAgentEvent extends ServerEvent {}
export interface UpdateAgentEvent extends ServerEvent {}
