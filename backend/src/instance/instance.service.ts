import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AgentService } from 'src/agent/agent.service';
import { ServerMessageType } from 'src/enums/WebsocketMessageType';
import { ImageVersionRepository } from 'src/image-version/image-version.repository';
import { ImageRepository } from 'src/image/image.repository';
import { ResourceAllocationService } from 'src/resource-allocation/resource-allocation.service';
import { User } from 'src/user/user.entity';
import { WebsocketService } from 'src/websocket/websocket.service';
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
    private websocketService: WebsocketService,
  ) {}

  public async getInstances(): Promise<Instance[]> {
    return await this.instanceRepository.find();
  }

  /**
   * Gets all instances associated with the specified user
   *
   * @param userId
   * @param relations
   * @returns
   */
  public async getUserInstances(
    userId: string,
    relations?: string[],
  ): Promise<Instance[]> {
    return await this.instanceRepository.find({
      where: { user: { id: userId } },
      relations,
    });
  }

  /**
   * Gets the specified instance
   *
   * @param id
   * @param relations
   * @returns
   */
  public async getInstance(
    id: string,
    relations?: string[],
  ): Promise<Instance> {
    const instance = await this.instanceRepository.findOne(id, { relations });

    if (!instance) {
      throw new NotFoundException('Instance not found!');
    }

    return instance;
  }

  /**
   * Creates a new instance and triggers the provisioning process
   *
   * @param createInstanceDto
   * @param user
   * @returns
   */
  public async createInstance(
    createInstanceDto: CreateInstanceDTO,
    user: User,
  ): Promise<Instance> {
    const agent = await this.agentService.findAvailableAgent();

    if (!agent) {
      throw new InternalServerErrorException();
    }

    const allocations =
      await this.resourceAllocationService.getFreeUserAllocations(user.id);

    if (allocations.length === 0) {
      throw new NotFoundException('No available allocations!');
    }

    const image = await this.imageRepository.findOne(
      createInstanceDto.image_id,
    );
    const imageVersion = await this.imageVersionRepository.findOne(
      createInstanceDto.version_id,
    );

    if (!image || !imageVersion) {
      throw new NotFoundException();
    }

    const instance = await this.instanceRepository.createInstance(
      image,
      imageVersion,
      user,
      agent,
      allocations[0],
    );

    // Trigger the agent instance creation process
    const wsClientId = this.websocketService.getAgentClientId(agent.id);
    // TODO: handle if the agent isn't currently running - this should be queued instead
    this.websocketService.sendMessage(
      wsClientId,
      ServerMessageType.PROVISION_INSTANCE,
      { instance },
    );

    return instance;
  }

  /**
   * Attempts to start the specified instance
   *
   * @param instanceId
   * @param user
   */
  public async startInstance(instanceId: string, user: User) {
    const instance = await this.getInstance(instanceId, ['user', 'agent']);

    if (instance.user.id !== user.id) {
      throw new ForbiddenException();
    }

    const wsClientId = this.websocketService.getAgentClientId(
      instance.agent.id,
    );
    this.websocketService.sendMessage(
      wsClientId,
      ServerMessageType.START_INSTANCE,
      { instance },
    );
  }

  /**
   * Attempts to stop the specified instance
   *
   * @param instanceId
   * @param user
   */
  public async stopInstance(instanceId: string, user: User) {
    const instance = await this.getInstance(instanceId, ['user', 'agent']);

    if (instance.user.id !== user.id) {
      throw new ForbiddenException();
    }

    const wsClientId = this.websocketService.getAgentClientId(
      instance.agent.id,
    );
    this.websocketService.sendMessage(
      wsClientId,
      ServerMessageType.STOP_INSTANCE,
      { instance },
    );
  }
}
