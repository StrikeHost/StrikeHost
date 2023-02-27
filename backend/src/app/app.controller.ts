import { Controller, Get, HttpCode } from '@nestjs/common';
import { BypassAuth } from 'src/auth/guards/bypass-auth.decorator';

@Controller('')
export class AppController {
  @Get('status')
  @BypassAuth()
  @HttpCode(200)
  getStatus() {
    return 'OK';
  }
}
