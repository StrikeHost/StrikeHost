import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentModule } from 'src/agent/agent.module';
import { ResourceAllocationModule } from 'src/resource-allocation/resource-allocation.module';
import { InstanceController } from './instance.controller';
import { InstanceRepository } from './instance.repository';
import { InstanceService } from './instance.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([InstanceRepository]),
    AgentModule,
    ResourceAllocationModule,
  ],
  providers: [InstanceService],
  controllers: [InstanceController],
})
export class InstanceModule {}
