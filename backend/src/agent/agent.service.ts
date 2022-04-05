import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agent } from './agent.entity';
import { AgentRepository } from './agent.repository';

@Injectable()
export class AgentService {
  constructor(
    @InjectRepository(AgentRepository)
    private agentRepository: AgentRepository,
  ) {}

  public async getAgents(): Promise<Agent[]> {
    return await this.agentRepository.find();
  }

  public async getAgent(id: string): Promise<Agent> {
    const agent = await this.agentRepository.findOne(id);

    if (!agent) {
      throw new NotFoundException('Agent not found!');
    }

    return agent;
  }

  public async findAvailableAgent(): Promise<Agent> {
    const agents = await this.agentRepository.find();

    for (const agent of agents) {
      if (agent.free_memory > 0) {
        return agent;
      }
    }

    return null;
  }
}
