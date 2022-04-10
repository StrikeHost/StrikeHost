import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Instance } from 'src/instance/instance.entity';
import { InstanceRepository } from 'src/instance/instance.repository';

@Injectable()
export class InstanceService {
  constructor(
    @InjectRepository(InstanceRepository)
    private instanceRepository: InstanceRepository,
  ) {}

  /**
   * Get all instances
   *
   * @returns {Promise<Instance[]>}
   */
  async getAllInstances(): Promise<Instance[]> {
    return await this.instanceRepository.find({ relations: ['user'] });
  }

  /**
   * Get instance by id
   *
   * @param {string} instanceId
   * @param {string[]} relations
   * @returns {Promise<Instance>}
   */
  async getInstance(
    instanceId: string,
    relations?: string[],
  ): Promise<Instance> {
    return await this.instanceRepository.findOne(instanceId, { relations });
  }
}
