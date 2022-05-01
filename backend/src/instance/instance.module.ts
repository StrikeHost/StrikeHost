import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentModule } from 'src/agent/agent.module';
import { ImageVersionRepository } from 'src/image-version/image-version.repository';
import { ImageRepository } from 'src/image/image.repository';
import { ResourceAllocationModule } from 'src/resource-allocation/resource-allocation.module';
import { InstanceController } from './instance.controller';
import { InstanceRepository } from './instance.repository';
import { InstanceService } from './instance.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InstanceRepository,
      ImageRepository,
      ImageVersionRepository,
    ]),
    AgentModule,
    ResourceAllocationModule,
  ],
  providers: [InstanceService],
  controllers: [InstanceController],
})
export class InstanceModule {}
