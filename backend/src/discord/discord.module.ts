import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { InstanceModule } from 'src/instance/instance.module';
import { DiscordController } from './discord.controller';
import { DiscordService } from './discord.service';

@Module({
  imports: [UserModule, InstanceModule],
  controllers: [DiscordController],
  providers: [DiscordService],
})
export class DiscordModule {}
