import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceAllocationRepository } from './resource-allocation.repository';
import { ResourceAllocationService } from './resource-allocation.service';

@Module({
  imports: [TypeOrmModule.forFeature([ResourceAllocationRepository])],
  providers: [ResourceAllocationService],
  exports: [ResourceAllocationService],
})
export class ResourceAllocationModule {}
