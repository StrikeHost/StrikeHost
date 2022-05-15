import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AgentService } from 'src/agent/agent.service';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { CreateAgentDTO } from './dto/create-agent.dto';

@Controller('admin/agent')
@UseGuards(AdminGuard)
export class AgentController {
  constructor(private agentService: AgentService) {}

  @Get()
  async GetAgents(@Param('skip') skip: number) {
    return await this.agentService.getAgents(['instances'], skip);
  }

  @Post()
  async CreateAgent(@Body() createAgentDto: CreateAgentDTO) {
    const agent = await this.agentService.createAgent(createAgentDto);

    return agent;
  }

  @Get(':agentId')
  async GetAgent(@Param('agentId') agentId: string) {
    const agent = await this.agentService.getAgent(agentId, [
      'instances',
      'instances.image',
      'instances.version',
      'instances.user',
    ]);

    return agent;
  }

  @Post(':agentId/delete')
  @HttpCode(HttpStatus.OK)
  async DeleteAgent(@Param('agentId') agentId: string) {
    // We should check that there aren't any instances running on this agent.
    // Also, maybe just mark it as deleted?
    await this.agentService.deleteAgent(agentId);
  }

  // Not sure if we need this any more
  @Get(':agentId/instance')
  async GetAgentInstances(@Param('agentId') agentId: string) {
    const instances = await this.agentService.getAgentInstances(agentId, [
      'image',
      'version',
      'user',
    ]);

    return instances;
  }

  @Post(':agentId/restart')
  @HttpCode(HttpStatus.OK)
  async RestartAgent(@Param('agentId') agentId: string) {
    // Do something
  }

  @Post(':agentId/update')
  @HttpCode(HttpStatus.OK)
  async UpdateAgent(@Param('agentId') agentId: string) {
    // Do something
  }

  @Post(':agentId/reset')
  @HttpCode(HttpStatus.OK)
  async ResetAgent(@Param('agentId') agentId: string) {
    // Do something
  }

  @Post(':agentId/secret')
  async AddAgentSecret(@Req() req, @Param('agentId') agentId: string) {
    const secret = await this.agentService.createAgentSecret(agentId, req.user);

    return { token: secret };
  }
}
