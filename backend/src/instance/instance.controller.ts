import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateInstanceDTO } from './dto/create-instance.dto';
import { InstanceService } from './instance.service';

@Controller('instance')
@UseGuards(JwtAuthGuard)
export class InstanceController {
  constructor(private instanceService: InstanceService) {}

  @Get()
  GetUserInstances(@Req() req) {
    return this.instanceService.getUserInstances(req.user.id, ['agent']);
  }

  @Get(':instanceId')
  async GetUserInstance(@Req() req, @Param('instanceId') instanceId: string) {
    const instance = await this.instanceService.getInstance(instanceId, [
      'user',
      'agent',
      'image',
      'version',
      'image.game',
    ]);
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
}
