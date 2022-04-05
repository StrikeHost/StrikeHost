import { Test, TestingModule } from '@nestjs/testing';
import { ResourceAllocationService } from './resource-allocation.service';

describe('ResourceAllocationService', () => {
  let service: ResourceAllocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResourceAllocationService],
    }).compile();

    service = module.get<ResourceAllocationService>(ResourceAllocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
