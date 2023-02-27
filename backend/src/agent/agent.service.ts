import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAgentDTO } from 'src/admin/agent/dto/create-agent.dto';
import { AgentSecret } from 'src/agent-secret/agent-secret.entity';
import { AuthService } from 'src/auth/auth.service';
import { Instance } from 'src/instance/instance.entity';
import { InstanceRepository } from 'src/instance/instance.repository';
import { PaginatedResponse } from 'src/interfaces/PaginatedResponse';
import { User } from 'src/user/user.entity';
import { Agent } from './agent.entity';
import { AgentRepository } from './agent.repository';
import { SetupAgentDto } from './dto/setup-agent.dto';
import { Socket } from 'socket.io';

@Injectable()
export class AgentService {
  constructor(
    @InjectRepository(AgentRepository)
    private agentRepository: AgentRepository,
    @InjectRepository(InstanceRepository)
    private instanceRepository: InstanceRepository,
    private jwtTokenService: AuthService,
  ) {}

  /**
   * Returns an array of all agents.
   *
   * @param {string[]} relations
   * @returns {Promise<Agent[]>}
   */
  public async getAgents(
    relations?: string[],
    skip?: number,
    count: number = 20,
  ): Promise<PaginatedResponse<Agent>> {
    const [results, selected] = await this.agentRepository.findAndCount({
      relations,
      skip,
      take: count,
    });

    return {
      results,
      count: selected,
    };
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
   * Creates a new secret for an agent
   *
   * @param {string} agentId
   * @param {User} user
   * @returns {Promise<string>}
   */
  async createAgentSecret(agentId: string, user: User): Promise<string> {
    const agent = await this.getAgent(agentId);

    const agentSecret = new AgentSecret();
    agentSecret.agent = agent;
    agentSecret.created_by = user;

    const token = await this.jwtTokenService.loginAgent(agent);
    agentSecret.secret = token;
    await agentSecret.save();

    return token;
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

  /**
   * Performs the initial setup process for an agent
   *
   * @param {string} client
   * @param {SetupAgentDto} registerAgentDto
   * @returns {Promise<Agent>}
   */
  public async initialSetupAgent(
    client: Socket,
    registerAgentDto: SetupAgentDto,
  ): Promise<Agent> {
    const agentObj = this.jwtTokenService.decodeAgent(registerAgentDto.token);
    const agent = await this.agentRepository.findOne(agentObj.id);

    if (!agent) {
      throw new NotFoundException('Agent not found!');
    }

    agent.cores = registerAgentDto.specs.cores;
    agent.ip = registerAgentDto.publicAddress;
    agent.memory = registerAgentDto.specs.total_memory;
    agent.free_memory = agent.memory;
    agent.allocated_memory = 0;
    agent.status = '';
    agent.port_numbers = Array.from({ length: 512 }, (_, i) => i + 1024);
    agent.cores = registerAgentDto.specs.cores;
    agent.free_cores = agent.cores;
    agent.allocated_cores = 0;

    await agent.save();

    return agent;
  }
}
