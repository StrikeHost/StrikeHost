import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentRepository } from './agent.repository';
import { AgentService } from './agent.service';

@Module({
  imports: [TypeOrmModule.forFeature([AgentRepository])],
  exports: [AgentService],
  providers: [AgentService],
})
export class AgentModule {}
