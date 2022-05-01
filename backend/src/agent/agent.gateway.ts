import {
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
  MessageBody,
} from '@nestjs/websockets';
import { AgentService } from './agent.service';
import { ClientMessageType } from 'src/enums/WebsocketMessageType';

@WebSocketGateway()
export class AgentGateway {
  constructor(private agentService: AgentService) {}

  @SubscribeMessage(ClientMessageType.SETUP_AGENT)
  handleMessage(
    @MessageBody('token')
    client: any,
  ): WsResponse {}
}
