import { InjectRepository } from '@nestjs/typeorm';
import { Agent } from 'src/agent/agent.entity';
import { ImageVersion } from 'src/image-version/image-version.entity';
import { ImageVersionRepository } from 'src/image-version/image-version.repository';
import { Image } from 'src/image/image.entity';
import { ImageRepository } from 'src/image/image.repository';
import { ResourceAllocation } from 'src/resource-allocation/resource-allocation.entity';
import { User } from 'src/user/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateInstanceDTO } from './dto/create-instance.dto';
import { Instance } from './instance.entity';

@EntityRepository(Instance)
export class InstanceRepository extends Repository<Instance> {
  constructor(
    @InjectRepository(ImageRepository)
    private imageRepository: ImageRepository,
    @InjectRepository(ImageVersionRepository)
    private imageVersionRepository: ImageVersionRepository,
  ) {
    super();
  }

  public async createInstance(
    image: Image,
    imageVersion: ImageVersion,
    user: User,
    agent: Agent,
    resource: ResourceAllocation,
  ): Promise<Instance> {
    const instance = new Instance();
    instance.user = user;
    instance.image = image;
    instance.version = imageVersion;
    instance.cpus = resource.cpus;
    instance.memory = resource.memory;
    instance.storage = resource.storage;
    instance.agent = agent;
    instance.port = agent.findAvailablePort();
    instance.status = 'STOPPED';

    resource.instance = instance;

    agent.claimPort(instance.port);
    agent.allocated_memory += resource.memory;
    agent.free_memory -= resource.memory;

    agent.allocated_cores += resource.cpus;
    agent.free_cores -= resource.cpus;

    agent.allocated_storage += resource.storage;
    agent.free_storage -= resource.storage;

    await instance.save();
    await agent.save();
    await resource.save();

    return instance;
  }
}
