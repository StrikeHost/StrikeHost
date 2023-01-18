import { Get, Post, Body, Param, Controller } from '@nestjs/common';

import { DiscordService } from './discord.service';
import { BypassAuth } from 'src/auth/guards/bypass-auth.decorator';

@Controller('discord')
export class DiscordController {
  constructor(private discordService: DiscordService) {}

  @Post('link')
  @BypassAuth()
  linkDiscordAccount(
    @Body('discord_id') discord_id: string,
    @Body('strike_id') strike_id: string,
  ) {
    return this.discordService.linkDiscordToUser(discord_id, strike_id);
  }

  @Get('user/:discord_id')
  @BypassAuth()
  getUserByDiscordId(@Param('discord_id') discord_id: string) {
    return this.discordService.getDiscordUser(discord_id);
  }
}
