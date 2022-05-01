import {
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
  MessageBody,
} from '@nestjs/websockets';
import { AgentService } from './agent.service';
import {
  ClientMessageType,
  ServerEnumType,
} from 'src/enums/WebsocketMessageType';
import { SetupAgentDto } from './dto/setup-agent.dto';
import { Socket } from 'socket.io';
import { WebsocketService } from 'src/websocket/websocket.service';

@WebSocketGateway()
export class AgentGateway {
  constructor(
    private agentService: AgentService,
    private websocketService: WebsocketService,
  ) {}

  @SubscribeMessage(ClientMessageType.REGISTER_AGENT)
  async RegisterAgent(
    @MessageBody('agentId') agentId: string,
    client: Socket,
  ): Promise<void> {
    const agent = await this.agentService.getAgent(agentId);
    this.websocketService.registerAgentConnection(client, agent);
  }

  @SubscribeMessage(ClientMessageType.SETUP_AGENT)
  async SetupAgent(
    @MessageBody() registerAgentDto: SetupAgentDto,
    client: any,
  ): Promise<WsResponse<any>> {
    const agent = await this.agentService.initialSetupAgent(
      client,
      registerAgentDto,
    );

    return {
      event: ServerEnumType.AGENT_ASSIGN,
      data: agent,
    };
  }
}
