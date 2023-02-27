import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { ClientMessageType } from 'src/enums/WebsocketMessageType';
import { InstanceConsoleDto } from './dto/instance-console.dto';
import { InstanceStateChangeDto } from './dto/instance-state-change.dto';
import { InstanceService } from './instance.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class InstanceGateway {
  constructor(private instanceService: InstanceService) {}

  // @SubscribeMessage(ClientMessageType.INSTANCE_STATE_CHANGE)
  // handleMessage(client: Socket, payload: any): WsResponse {}

  @SubscribeMessage(ClientMessageType.INSTANCE_CONSOLE)
  InstanceConsole(@MessageBody() instanceConsoleDto: InstanceConsoleDto) {
    this.instanceService.relayInstanceConsoleMessage(
      instanceConsoleDto.instanceId,
      instanceConsoleDto,
    );
  }

  @SubscribeMessage(ClientMessageType.INSTANCE_STATE_CHANGE)
  InstanceStateChange(
    @MessageBody() instanceStateChangeDto: InstanceStateChangeDto,
  ) {
    this.instanceService.changeInstanceState(
      instanceStateChangeDto.instanceId,
      instanceStateChangeDto,
    );
  }
}
