import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateResourceAllocationDTO } from 'src/admin/user/dto/create-resource-allocation.dto';
import { PaginatedResponse } from 'src/interfaces/PaginatedResponse';
import { UserRepository } from 'src/user/user.repository';
import { ResourceAllocation } from './resource-allocation.entity';
import { ResourceAllocationRepository } from './resource-allocation.repository';

@Injectable()
export class ResourceAllocationService {
  constructor(
    @InjectRepository(ResourceAllocationRepository)
    private resourceAllocationRepository: ResourceAllocationRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  /**
   * Return an array of unused resource allocations for this user
   *
   * @param {string} userId
   * @returns {Promise<ResourceAllocation[]>}
   */
  async getFreeUserAllocations(userId: string): Promise<ResourceAllocation[]> {
    return await this.resourceAllocationRepository.getFreeAllocationsByUser(
      userId,
    );
  }

  /**
   * Get all resource allocations for a user
   *
   * @param {string} userId
   * @param {number} skip
   * @param {number} count
   * @returns {Promise<PaginatedResponse<ResourceAllocation>>}
   */
  async getAllUserAllocations(
    userId: string,
    skip?: number,
    count: number = 20,
  ): Promise<PaginatedResponse<ResourceAllocation>> {
    const [results, selected] =
      await this.resourceAllocationRepository.findAndCount({
        relations: [
          'instance',
          'instance.image',
          'instance.image.game',
          'instance.agent',
        ],
        skip,
        take: count,
      });

    return {
      results,
      count: selected,
    };
  }

  /**
   * Allocates a new resource to a user
   *
   * @param {string} userId
   * @param {CreateResourceAllocationDTO} createAllocationDto
   * @returns {Promise<ResourceAllocation>}
   */
  async allocateUserResource(
    userId: string,
    createAllocationDto: CreateResourceAllocationDTO,
  ): Promise<ResourceAllocation> {
    const user = await this.userRepository.findOne(userId);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const { cpus, memory, storage } = createAllocationDto;

    const allocation = new ResourceAllocation();
    allocation.memory = memory;
    allocation.storage = storage;
    allocation.user = user;
    allocation.cpus = cpus;

    await allocation.save();

    return allocation;
  }
}
