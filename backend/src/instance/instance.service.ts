import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AgentService } from 'src/agent/agent.service';
import { ImageVersionRepository } from 'src/image-version/image-version.repository';
import { ImageRepository } from 'src/image/image.repository';
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
    @InjectRepository(ImageRepository)
    private imageRepository: ImageRepository,
    @InjectRepository(ImageVersionRepository)
    private imageVersionRepository: ImageVersionRepository,
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
    console.log('here');
    const agent = await this.agentService.findAvailableAgent();

    if (!agent) {
      throw new InternalServerErrorException();
    }

    console.log('here2');
    const allocations =
      await this.resourceAllocationService.getFreeUserAllocations(user.id);

    if (allocations.length === 0) {
      throw new NotFoundException('No available allocations!');
    }

    console.log('here3');

    const image = await this.imageRepository.findOne(
      createInstanceDto.image_id,
    );
    const imageVersion = await this.imageVersionRepository.findOne(
      createInstanceDto.version_id,
    );

    if (!image || !imageVersion) {
      throw new NotFoundException();
    }

    return await this.instanceRepository.createInstance(
      image,
      imageVersion,
      user,
      agent,
      allocations[0],
    );
  }
}
