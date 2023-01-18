import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { DiscordController } from './discord.controller';
import { DiscordService } from './discord.service';

@Module({
  imports: [UserModule],
  controllers: [DiscordController],
  providers: [DiscordService],
})
export class DiscordModule {}
