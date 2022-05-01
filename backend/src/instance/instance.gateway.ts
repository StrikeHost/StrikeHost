import {
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { ClientMessageType } from 'src/enums/WebsocketMessageType';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class InstanceGateway {
  // @SubscribeMessage(ClientMessageType.INSTANCE_STATE_CHANGE)
  // handleMessage(client: Socket, payload: any): WsResponse {}
}
