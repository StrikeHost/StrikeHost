import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAgentDTO } from 'src/admin/agent/dto/create-agent.dto';
import { Instance } from 'src/instance/instance.entity';
import { InstanceRepository } from 'src/instance/instance.repository';
import { Agent } from './agent.entity';
import { AgentRepository } from './agent.repository';

@Injectable()
export class AgentService {
  constructor(
    @InjectRepository(AgentRepository)
    private agentRepository: AgentRepository,
    @InjectRepository(InstanceRepository)
    private instanceRepository: InstanceRepository,
  ) {}

  /**
   * Returns an array of all agents.
   *
   * @param {string[]} relations
   * @returns {Promise<Agent[]>}
   */
  public async getAgents(relations?: string[]): Promise<Agent[]> {
    return await this.agentRepository.find({ relations });
  }

  /**
   * Retrieves an agent by its ID.
   *
   * @param {string} id
   * @param {string[]} relations
   * @returns {Promise<Agent>}
   */
  public async getAgent(id: string, relations?: string[]): Promise<Agent> {
    const agent = await this.agentRepository.findOne(id, { relations });

    if (!agent) {
      throw new NotFoundException('Agent not found!');
    }

    return agent;
  }

  /**
   * Creates a new agent.
   *
   * @param {CreateAgentDTO} createAgentDto
   * @returns {Promise<Agent>}
   */
  async createAgent(createAgentDto: CreateAgentDTO): Promise<Agent> {
    const { ip } = createAgentDto;

    const agent = new Agent();
    agent.ip = ip;
    await agent.save();

    return agent;
  }

  /**
   * Deletes an agent
   *
   * @param {string} agentId
   */
  async deleteAgent(agentId: string) {
    await this.agentRepository.delete(agentId);
  }

  /**
   * Get all instances belonging to an agent
   *
   * @param {string} agentId
   * @param {string[]} relations
   * @returns {Promise<Instance[]>}
   */
  async getAgentInstances(
    agentId: string,
    relations?: string[],
  ): Promise<Instance[]> {
    const instances = await this.instanceRepository.find({
      where: { agent: { id: agentId } },
      relations,
    });

    return instances;
  }

  /**
   * Finds an available agent with free memory
   *
   * @returns {Promise<Agent>}
   */
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
