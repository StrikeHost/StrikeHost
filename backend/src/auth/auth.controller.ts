import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDTO } from './dto/register-user.dto';
import { BypassAuth } from './guards/bypass-auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @BypassAuth()
  async register(@Body() registerUserDTO: RegisterUserDTO) {
    const user = await this.authService.register(registerUserDTO);
    return this.authService.login(user.email, registerUserDTO.password);
  }

  @Post('login')
  @BypassAuth()
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.login(email, password);
  }

  @Post('logout')
  async logout(@Req() req) {
    return {};
  }
}
