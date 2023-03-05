import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstanceRepository } from 'src/instance/instance.repository';
import { InstanceBackupController } from './instance-backup.controller';
import { InstanceBackupRepository } from './instance-backup.repository';
import { InstanceBackupService } from './instance-backup.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([InstanceRepository, InstanceBackupRepository]),
  ],
  controllers: [InstanceBackupController],
  providers: [InstanceBackupService],
})
export class InstanceBackupModule {}
