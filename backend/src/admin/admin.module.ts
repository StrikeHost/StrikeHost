import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { AgentModule } from './agent/agent.module';
import { GameModule } from './game/game.module';
import { ImageModule } from './image/image.module';
import { InstanceModule } from './instance/instance.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AgentModule, GameModule, ImageModule, InstanceModule, UserModule],
  providers: [{ provide: APP_GUARD, useClass: AdminGuard }],
})
export class AdminModule {}
