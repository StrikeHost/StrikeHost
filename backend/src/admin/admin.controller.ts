import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('admin')
@UseGuards(AdminGuard)
export class AdminController {
  @Get()
  async GetDashboard() {
    // todo
  }
}
