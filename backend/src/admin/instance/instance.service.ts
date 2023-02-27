import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Instance } from 'src/instance/instance.entity';
import { InstanceRepository } from 'src/instance/instance.repository';
import { PaginatedResponse } from 'src/interfaces/PaginatedResponse';

@Injectable()
export class InstanceService {
  constructor(
    @InjectRepository(InstanceRepository)
    private instanceRepository: InstanceRepository,
  ) {}

  /**
   * Get all instances
   *
   * @returns {Promise<PaginatedResponse<Instance>>}
   */
  async getAllInstances(
    skip?: number,
    count: number = 20,
  ): Promise<PaginatedResponse<Instance>> {
    const [results, selected] = await this.instanceRepository.findAndCount({
      relations: ['user', 'agent', 'image', 'version', 'image.game'],
      skip,
      take: count,
    });

    return {
      results,
      count: selected,
    };
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
