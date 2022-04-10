import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstanceRepository } from 'src/instance/instance.repository';
import { AgentRepository } from './agent.repository';
import { AgentService } from './agent.service';

@Module({
  imports: [TypeOrmModule.forFeature([AgentRepository, InstanceRepository])],
  exports: [AgentService],
  providers: [AgentService],
})
export class AgentModule {}
