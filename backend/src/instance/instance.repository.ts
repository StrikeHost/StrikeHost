import { InjectRepository } from '@nestjs/typeorm';
import { Agent } from 'src/agent/agent.entity';
import { ImageVersionRepository } from 'src/image-version/image-version.repository';
import { ImageRepository } from 'src/image/image.repository';
import { ResourceAllocation } from 'src/resource-allocation/resource-allocation.entity';
import { User } from 'src/user/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateInstanceDTO } from './dto/create-instance.dto';
import { Instance } from './instance.entity';

@EntityRepository(Instance)
export class InstanceRepository extends Repository<Instance> {
  constructor(
    @InjectRepository(ImageRepository) private imageRepository: ImageRepository,
    @InjectRepository(ImageVersionRepository)
    private imageVersionRepository: ImageVersionRepository,
  ) {
    super();
  }

  public async createInstance(
    createInstanceDto: CreateInstanceDTO,
    user: User,
    agent: Agent,
    resource: ResourceAllocation,
  ): Promise<Instance> {
    const { game_id, image_id, version_id } = createInstanceDto;

    const requestedCpus = 1;
    const requestedMemory = 1024;
    const requestedStorage = 10;

    const instance = new Instance();
    instance.image = await this.imageRepository.findOne(image_id);
    instance.user = user;
    instance.cpus = requestedCpus;
    instance.memory = requestedMemory;
    instance.storage = requestedStorage;
    instance.version = await this.imageVersionRepository.findOne(version_id);
    instance.agent = agent;
    instance.port = agent.findAvailablePort();

    resource.instance = instance;

    agent.claimPort(instance.port);
    agent.allocated_memory += requestedMemory;
    agent.free_memory -= requestedMemory;

    agent.allocated_cores += requestedCpus;
    agent.free_cores -= requestedCpus;

    agent.allocated_storage += requestedStorage;
    agent.free_storage -= requestedStorage;

    await instance.save();
    await agent.save();
    await resource.save();

    return instance;
  }
}
