import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { ClientMessageType } from 'src/enums/WebsocketMessageType';
import { InstanceBackup } from 'src/instance-backup/instance-backup.entity';
import { InstanceBackupDoneDto } from './dto/instance-backup-done.dto';
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

  @SubscribeMessage(ClientMessageType.BACKUP_DONE)
  async InstanceBackupDone(
    @MessageBody() instanceBackupDoneDto: InstanceBackupDoneDto,
  ) {
    const instance = await this.instanceService.getInstance(
      instanceBackupDoneDto.instanceId,
    );

    const backup = new InstanceBackup();
    backup.instance = instance;
    backup.backupId = instanceBackupDoneDto.backupId;
    backup.save();

    // TODO: check if there are more than 4 backups and delete the older ones

    // Send a message to the user that the backup is done
  }
}
