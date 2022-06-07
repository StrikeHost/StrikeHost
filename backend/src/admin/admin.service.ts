import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Agent } from 'src/agent/agent.entity';
import { AgentRepository } from 'src/agent/agent.repository';
import { Image } from 'src/image/image.entity';
import { ImageRepository } from 'src/image/image.repository';
import { Instance } from 'src/instance/instance.entity';
import { InstanceRepository } from 'src/instance/instance.repository';
import { User } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { createQueryBuilder } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(InstanceRepository)
    private instanceRepository: InstanceRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(AgentRepository)
    private agentRepository: AgentRepository,
    @InjectRepository(ImageRepository)
    private imageRepository: ImageRepository,
  ) {}

  async getDashboardData(): Promise<unknown[]> {
    return await this.getInstanceCount();
  }

  private getInstanceCount = async () => {
    const results = await this.instanceRepository
      .createQueryBuilder()
      .select(['count(instance.id) as count', 'created_at'])
      .groupBy('created_at')
      .orderBy('created_at', 'ASC')
      .getMany();

    return results;
  };
}
