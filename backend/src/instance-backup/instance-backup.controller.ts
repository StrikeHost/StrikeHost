import { Controller, Delete, Get, Param, Req } from '@nestjs/common';
import { InstanceBackupService } from './instance-backup.service';

@Controller('instance-backup')
export class InstanceBackupController {
  constructor(private readonly instanceBackupService: InstanceBackupService) {}

  @Delete(':backupId')
  async DeleteBackup(
    @Req() req: any,
    @Param('backupId') backupId: string,
  ): Promise<any> {
    return this.instanceBackupService.deleteBackup(req.user.id, backupId);
  }

  @Get(':backupId')
  async DownloadBackup(
    @Req() req: any,
    @Param('backupId') backupId: string,
  ): Promise<string> {
    return this.instanceBackupService.downloadBackup(req.user.id, backupId);
  }
}
