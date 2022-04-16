import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentRepository } from 'src/agent/agent.repository';
import { AgentController } from './agent.controller';
import { AgentModule as RootAgentModule } from 'src/agent/agent.module';

@Module({
  imports: [TypeOrmModule.forFeature([AgentRepository]), RootAgentModule],
  controllers: [AgentController],
  providers: [],
})
export class AgentModule {}
