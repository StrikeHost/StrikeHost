import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { InstanceService } from './instance.service';

@Controller('admin/instance')
@UseGuards(AdminGuard)
export class InstanceController {
  constructor(private instanceService: InstanceService) {}

  @Get()
  async GetInstances() {
    return await this.instanceService.getAllInstances();
  }

  @Get('/:instanceId')
  async GetInstance(@Param('instanceId') instanceId: string) {
    return await this.instanceService.getInstance(instanceId, [
      'user',
      'game',
      'game.image',
      'game.image.version',
    ]);
  }
}
