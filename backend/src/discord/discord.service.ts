import { Injectable, NotFoundException } from '@nestjs/common';

import { UserService } from 'src/user/user.service';
import { InstanceService } from 'src/instance/instance.service';

@Injectable()
export class DiscordService {
  constructor(
    private userService: UserService,
    private instanceService: InstanceService,
  ) {}

  // Get user and link discord id
  async linkDiscordToUser(discord_id: string, strike_id: string) {
    const user = await this.userService.getUser(strike_id);

    if (user) {
      user.discord_id = discord_id;
      await user.save();
    } else {
      throw new NotFoundException();
    }
  }

  // Unlink discord id
  async unlinkDiscord(discord_id: string) {
    const user = await this.userService.getUserByDiscordId(discord_id);

    if (user) {
      user.discord_id = null;
      await user.save();
    } else {
      throw new NotFoundException();
    }
  }

  // Get discord user
  async getDiscordUser(discord_id: string) {
    const user = await this.userService.getUserByDiscordId(discord_id);

    if (user) {
      return user;
    } else {
      throw new NotFoundException();
    }
  }

  // Get instances by discord id
  async getInstancesByDiscordId(discord_id: string) {
    const user = await this.userService.getUserByDiscordId(discord_id);

    if (user) {
      return user.instances;
    } else {
      throw new NotFoundException();
    }
  }

  // Start instance
  async startInstance(instance_id: string) {
    await this.instanceService.startInstance(instance_id);
  }
}
