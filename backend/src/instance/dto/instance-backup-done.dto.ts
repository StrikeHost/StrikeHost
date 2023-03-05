import { IsString } from 'class-validator';

export class InstanceBackupDoneDto {
  @IsString()
  instanceId: string;

  @IsString()
  backupId: string;
}
