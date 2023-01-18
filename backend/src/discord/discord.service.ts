import { BadRequestException, Injectable } from '@nestjs/common';

import { UserService } from 'src/user/user.service';

@Injectable()
export class DiscordService {
  constructor(private userService: UserService) {}

  // Get user and link discord id
  async linkDiscordToUser(discord_id: string, strike_id: string) {
    const user = await this.userService.getUser(strike_id);

    if (user) {
      user.discord_id = discord_id;
      await user.save();
    } else {
      throw new BadRequestException();
    }
  }

  // Get discord user
  async getDiscordUser(discord_id: string) {
    const user = await this.userService.getUserByDiscordId(discord_id);

    if (user) {
      return user;
    } else {
      throw new BadRequestException();
    }
  }
}
