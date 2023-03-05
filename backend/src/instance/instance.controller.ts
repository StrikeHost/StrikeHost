import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { InstanceService } from './instance.service';
import { CreateInstanceDTO } from './dto/create-instance.dto';
import { UpdateInstanceDto } from './dto/update-instance.dto';

@Controller('instance')
export class InstanceController {
  constructor(private instanceService: InstanceService) {}

  @Get()
  GetUserInstances(@Req() req) {
    return this.instanceService.getUserInstances(req.user.id, ['agent']);
  }

  @Get(':instanceId')
  async GetUserInstance(@Req() req, @Param('instanceId') instanceId: string) {
    const instance = await this.instanceService.getInstance(instanceId);
    if (instance.user.id !== req.user.id) {
      throw new ForbiddenException();
    }

    return instance;
  }

  @Post()
  CreateInstance(@Req() req, @Body() createInstaceDto: CreateInstanceDTO) {
    return this.instanceService.createInstance(createInstaceDto, req.user);
  }

  @Post(':instanceId/start')
  @HttpCode(200)
  async StartInstance(@Req() req, @Param('instanceId') instanceId: string) {
    this.instanceService.startInstance(instanceId, req.user);
  }

  @Post(':instanceId/stop')
  @HttpCode(200)
  async StopInstance(@Req() req, @Param('instanceId') instanceId: string) {
    this.instanceService.stopInstance(instanceId, req.user);
  }

  @Post(':instanceId/backup')
  async BackupInstance(@Req() req, @Param('instanceId') instanceId: string) {
    return this.instanceService.backupInstance(instanceId, req.user);
  }

  @Post(':instanceId/update')
  @HttpCode(200)
  async UpdateInstance(
    @Req() req,
    @Param('instanceId') instanceId: string,
    @Body() updateInstanceDto: UpdateInstanceDto,
  ) {
    return this.instanceService.updateInstance(
      instanceId,
      req.user.id,
      updateInstanceDto,
    );
  }
}
