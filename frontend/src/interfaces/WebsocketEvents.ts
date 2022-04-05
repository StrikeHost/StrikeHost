import { InstanceStatusType } from "./Instance";

/* eslint-disable @typescript-eslint/no-empty-interface */
export enum SocketEventName {
  INSTANCE_CONSOLE_RELAY = "instance.console",
  INSTANCE_STATE_CHANGE = "instance.state_change",
  SUBSCRIBE_INSTANCE_CONSOLE = "frontend.subscribe_console",
  UNSUBSCRIBE_INSTANCE_CONSOLE = "frontend.unsubscribe_console",
  REGISTER_FRONTEND_CONNECTION = "frontend.register_connection",
}

export interface SocketEvent {
  event: SocketEventName;
  data: Record<string, unknown>;
}

export interface RegisterFrontendConnectionEvent extends SocketEvent {
  data: {
    userId: string;
  };
}

export interface SubscribeToInstanceConsoleEvent extends SocketEvent {
  data: {
    instanceId: string;
  };
}

export interface UnsubscribeToInstanceConsoleEvent extends SocketEvent {
  data: {
    instanceId: string;
  };
}

export interface InstanceConsoleRelayEvent extends SocketEvent {
  data: {
    instanceId: string;
    text: string;
  };
}

export interface InstanceStateChangeEvent extends SocketEvent {
  instanceId: string;
  status: InstanceStatusType;
}
