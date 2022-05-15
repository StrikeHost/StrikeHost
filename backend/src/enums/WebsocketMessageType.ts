/* Client events - events emitted by WS clients */
export enum ClientMessageType {
  SETUP_AGENT = 'agent.setup',
  REGISTER_AGENT = 'agent.register',
  INSTANCE_CONSOLE = 'instance.console',
  INSTANCE_STATE_CHANGE = 'instance.state_change',
  REQUEST_IMAGE_LISTINGS = 'image.listings.request',
  SUBSCRIBE_INSTANCE_CONSOLE = 'frontend.subscribe_console',
  UNSUBSCRIBE_INSTANCE_CONSOLE = 'frontend.unsubscribe_console',
  REGISTER_FRONTEND_CONNECTION = 'frontend.register_connection',
}

/* Server events - events emitted by the server */
export enum ServerMessageType {
  RESET_AGENT = 'agent.reset',
  AGENT_ASSIGN = 'agent.assign',
  UPDATE_AGENT = 'agent.update',
  RESTART_AGENT = 'agent.restart',
  START_INSTANCE = 'instance.stop',
  STOP_INSTANCE = 'instance.start',
  DELETE_INSTANCE = 'instance.delete',
  PROVISION_INSTANCE = 'instance.provision',
  RELAY_INSTANCE_CONSOLE = 'instance.console',
  REJECT_REGISTER_AGENT = 'agent.reject_register',
  INSTANCE_STATE_CHANGE = 'instance.state_change',
  IMAGE_LISTINGS_RESPONSE = 'image.listings.response',
}
