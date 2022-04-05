import { EntityRepository, Repository } from 'typeorm';
import { Agent } from './agent.entity';

@EntityRepository(Agent)
export class AgentRepository extends Repository<Agent> {}
