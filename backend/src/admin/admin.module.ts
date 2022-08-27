import { Module } from '@nestjs/common';
import { AgentModule } from './agent/agent.module';
import { GameModule } from './game/game.module';
import { ImageModule } from './image/image.module';
import { InstanceModule } from './instance/instance.module';
import { UserModule } from './user/user.module';
import { SettingsModule } from './settings/settings.module';
import { EventModule } from './event/event.module';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstanceRepository } from 'src/instance/instance.repository';
import { UserRepository } from 'src/user/user.repository';
import { AgentRepository } from 'src/agent/agent.repository';
import { ImageRepository } from 'src/image/image.repository';
import { AdminController } from './admin.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InstanceRepository,
      UserRepository,
      AgentRepository,
      ImageRepository,
    ]),
    AgentModule,
    GameModule,
    ImageModule,
    InstanceModule,
    UserModule,
    SettingsModule,
    EventModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
