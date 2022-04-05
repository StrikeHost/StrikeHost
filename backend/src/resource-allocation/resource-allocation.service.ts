import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourceAllocation } from './resource-allocation.entity';
import { ResourceAllocationRepository } from './resource-allocation.repository';

@Injectable()
export class ResourceAllocationService {
  constructor(
    @InjectRepository(ResourceAllocationRepository)
    private readonly resourceAllocationRepository: ResourceAllocationRepository,
  ) {}

  /**
   * Return an array of unused resource allocations for this user
   *
   * @param {string} userId
   * @returns {Promise<ResourceAllocation[]>}
   */
  public async getFreeUserAllocations(
    userId: string,
  ): Promise<ResourceAllocation[]> {
    return await this.resourceAllocationRepository.getFreeAllocationsByUser(
      userId,
    );
  }
}
