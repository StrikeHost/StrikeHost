import { EntityRepository, Repository } from 'typeorm';
import { ResourceAllocation } from './resource-allocation.entity';

@EntityRepository(ResourceAllocation)
export class ResourceAllocationRepository extends Repository<ResourceAllocation> {
  public async findByUser(
    userId: string,
    relations?: string[],
  ): Promise<ResourceAllocation[]> {
    return await this.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations,
    });
  }

  public async getFreeAllocationsByUser(
    userId: string,
  ): Promise<ResourceAllocation[]> {
    return await this.find({
      where: {
        user: {
          id: userId,
        },
        instance: null,
      },
    });
  }
}
