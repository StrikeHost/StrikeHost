import { Module } from '@nestjs/common';
import { InstanceModule } from 'src/instance/instance.module';
import { UserModule } from 'src/user/user.module';
import { DiscordController } from './discord.controller';
import { DiscordService } from './discord.service';

@Module({
  imports: [UserModule, InstanceModule],
  controllers: [DiscordController],
  providers: [DiscordService],
})
export class DiscordModule {}
