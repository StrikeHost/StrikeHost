import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AgentService } from 'src/agent/agent.service';
import { ResourceAllocationService } from 'src/resource-allocation/resource-allocation.service';
import { User } from 'src/user/user.entity';
import { CreateInstanceDTO } from './dto/create-instance.dto';
import { Instance } from './instance.entity';
import { InstanceRepository } from './instance.repository';

@Injectable()
export class InstanceService {
  constructor(
    @InjectRepository(InstanceRepository)
    private instanceRepository: InstanceRepository,
    private agentService: AgentService,
    private resourceAllocationService: ResourceAllocationService,
  ) {}

  public async getInstances(): Promise<Instance[]> {
    return await this.instanceRepository.find();
  }

  public async getUserInstances(userId: string): Promise<Instance[]> {
    return await this.instanceRepository.find({
      where: { user: { id: userId } },
    });
  }

  public async getInstance(id: string): Promise<Instance> {
    const instance = await this.instanceRepository.findOne(id);

    if (!instance) {
      throw new NotFoundException('Instance not found!');
    }

    return instance;
  }

  public async createInstance(
    createInstanceDto: CreateInstanceDTO,
    user: User,
  ): Promise<Instance> {
    const agent = await this.agentService.findAvailableAgent();

    const allocations =
      await this.resourceAllocationService.getFreeUserAllocations(user.id);

    if (allocations.length === 0) {
      throw new NotFoundException('No available allocations!');
    }

    return await this.instanceRepository.createInstance(
      createInstanceDto,
      user,
      agent,
      allocations[0],
    );
  }
}
