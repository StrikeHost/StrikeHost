import { Test, TestingModule } from '@nestjs/testing';
import { InstanceGateway } from './instance.gateway';

describe('InstanceGateway', () => {
  let gateway: InstanceGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstanceGateway],
    }).compile();

    gateway = module.get<InstanceGateway>(InstanceGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
