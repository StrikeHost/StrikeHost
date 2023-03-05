import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstanceRepository } from 'src/instance/instance.repository';
import { InstanceBackupController } from './instance-backup.controller';
import { InstanceBackupRepository } from './instance-backup.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([InstanceRepository, InstanceBackupRepository]),
  ],
  controllers: [InstanceBackupController],
})
export class InstanceBackupModule {}
