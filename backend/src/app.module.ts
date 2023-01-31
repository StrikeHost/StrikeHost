import { Connection } from 'typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user/user.entity';
import { Game } from './game/game.entity';
import { Image } from './image/image.entity';
import { Agent } from './agent/agent.entity';
import { Event } from './event/event.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GameModule } from './game/game.module';
import { ImageModule } from './image/image.module';
import { AgentModule } from './agent/agent.module';
import { EventModule } from './event/event.module';
import { Setting } from './setting/setting.entity';
import { Instance } from './instance/instance.entity';
import { SettingModule } from './setting/setting.module';
import { InstanceModule } from './instance/instance.module';
import { AgentSecret } from './agent-secret/agent-secret.entity';
import { ImageVersion } from './image-version/image-version.entity';
import { AgentSecretModule } from './agent-secret/agent-secret.module';
import { ImageVersionModule } from './image-version/image-version.module';
import { ResourceAllocation } from './resource-allocation/resource-allocation.entity';
import { ResourceAllocationModule } from './resource-allocation/resource-allocation.module';
import { AdminController } from './admin/admin.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AdminModule } from './admin/admin.module';
import { WebsocketModule } from './websocket/websocket.module';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { DiscordModule } from './discord/discord.module';

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
  ],
  controllers: [AdminController],
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
