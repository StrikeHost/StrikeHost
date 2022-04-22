import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstanceRepository } from 'src/instance/instance.repository';
import { InstanceController } from './instance.controller';
import { InstanceService } from './instance.service';

@Module({
  imports: [TypeOrmModule.forFeature([InstanceRepository])],
  controllers: [InstanceController],
  providers: [InstanceService],
})
export class InstanceModule {}
