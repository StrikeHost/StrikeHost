import { EntityRepository, Repository } from 'typeorm';
import { InstanceBackup } from './instance-backup.entity';

@EntityRepository(InstanceBackup)
export class InstanceBackupRepository extends Repository<InstanceBackup> {}
