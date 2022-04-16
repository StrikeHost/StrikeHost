import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateInstanceDTO } from './dto/create-instance.dto';
import { InstanceService } from './instance.service';

@Controller('instance')
@UseGuards(JwtAuthGuard)
export class InstanceController {
  constructor(private instanceService: InstanceService) {}

  @Get()
  GetUserInstances(@Req() req) {
    return this.instanceService.getUserInstances(req.user.id);
  }

  @Post()
  CreateInstance(@Req() req, @Body() createInstaceDto: CreateInstanceDTO) {
    return this.instanceService.createInstance(createInstaceDto, req.user);
  }
}
