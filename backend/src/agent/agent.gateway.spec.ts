import { Test, TestingModule } from '@nestjs/testing';
import { AgentGateway } from './agent.gateway';

describe('AgentGateway', () => {
  let gateway: AgentGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgentGateway],
    }).compile();

    gateway = module.get<AgentGateway>(AgentGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
