import { store } from "index";
import {
  InstanceStateChangeEvent,
  SocketEvent,
  SocketEventName,
} from "interfaces/WebsocketEvents";
import { setInstanceState } from "redux/actions/InstancesActions";

/**
 * Handles any misc websocket events not directly targeting react elements
 *
 * @param {SocketEvent} event
 */
export const handleWebsocketEvent = (event: SocketEvent) => {
  switch (event.event) {
    case SocketEventName.INSTANCE_STATE_CHANGE:
      handleInstanceStateChangeEvent(event as InstanceStateChangeEvent);
      break;
  }
};

const handleInstanceStateChangeEvent = (event: InstanceStateChangeEvent) => {
  store.dispatch(setInstanceState(event.instanceId, event.status));
};
