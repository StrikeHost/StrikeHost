import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentModule } from 'src/agent/agent.module';
import { ImageVersionRepository } from 'src/image-version/image-version.repository';
import { ImageRepository } from 'src/image/image.repository';
import { ResourceAllocationModule } from 'src/resource-allocation/resource-allocation.module';
import { InstanceController } from './instance.controller';
import { InstanceRepository } from './instance.repository';
import { InstanceService } from './instance.service';
import { InstanceGateway } from './instance.gateway';
import { WebsocketModule } from 'src/websocket/websocket.module';
import { GameRepository } from 'src/game/game.repository';
import { InstanceBackupRepository } from 'src/instance-backup/instance-backup.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GameRepository,
      ImageRepository,
      InstanceBackupRepository,
      InstanceRepository,
      ImageVersionRepository,
    ]),
    AgentModule,
    ResourceAllocationModule,
    WebsocketModule,
  ],
  providers: [InstanceService, InstanceGateway],
  controllers: [InstanceController],
  exports: [InstanceService],
})
export class InstanceModule {}
