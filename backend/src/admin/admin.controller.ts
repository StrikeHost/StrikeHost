import { Controller, Get } from '@nestjs/common';

@Controller('admin')
export class AdminController {
  @Get()
  async GetDashboard() {
    // todo
  }
}
