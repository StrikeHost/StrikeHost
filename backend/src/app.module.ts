import { Connection } from 'typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GameModule } from './game/game.module';
import { ImageModule } from './image/image.module';
import { AgentModule } from './agent/agent.module';
import { EventModule } from './event/event.module';
import { SettingModule } from './setting/setting.module';
import { InstanceModule } from './instance/instance.module';
import { AgentSecretModule } from './agent-secret/agent-secret.module';
import { ImageVersionModule } from './image-version/image-version.module';
import { ResourceAllocationModule } from './resource-allocation/resource-allocation.module';
import { AdminController } from './admin/admin.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AdminModule } from './admin/admin.module';
import { WebsocketModule } from './websocket/websocket.module';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { DiscordModule } from './discord/discord.module';
import { AppController } from './app/app.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { InstanceBackupModule } from './instance-backup/instance-backup.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    UserModule,
    AuthModule,
    InstanceModule,
    SettingModule,
    GameModule,
    ImageModule,
    ImageVersionModule,
    ResourceAllocationModule,
    AgentModule,
    AgentSecretModule,
    EventModule,
    AdminModule,
    WebsocketModule,
    DiscordModule,
    ScheduleModule.forRoot(),
    InstanceBackupModule,
  ],
  controllers: [AdminController, AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
