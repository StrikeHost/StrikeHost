import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { AdminService } from './admin.service';

@Controller('admin')
@UseGuards(AdminGuard)
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('dashboard')
  async GetDashboard() {
    const dashboardData = await this.adminService.getDashboardData();

    return dashboardData;
  }
}
