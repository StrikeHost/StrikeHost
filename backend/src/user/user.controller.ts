import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { BypassAuth } from 'src/auth/guards/bypass-auth.decorator';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { getRepository } from 'typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async get(@Req() req) {
    return req.user;
  }

  @Post('confirm')
  @BypassAuth()
  async confirmEmail(@Body('token') token: string, @Req() req) {
    const email = await this.userService.decodeEmailToken(token);
    const user = await this.userService.confirmEmail(email);

    return user;
  }

  @Post('account/details')
  async update(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Req() req,
  ) {
    const user: User = req.user;
    user.first_name = firstName;
    user.last_name = lastName;
    user.email = email;

    await getRepository(User).save(user);

    const { password, ...partial } = user;

    return partial;
  }

  @Post('account/password')
  async changePassword(
    @Body('currentPassword') currentPassword: string,
    @Body('newPassword') newPassword: string,
    @Body('confirmPassword') confirmPassword: string,
    @Req() req,
  ) {
    const user: User = req.user;

    if (!user.comparePassword(currentPassword)) {
      throw new UnauthorizedException();
    }

    if (newPassword !== confirmPassword) {
      throw new BadRequestException();
    }

    user.password = newPassword;

    await getRepository(User).save(user);

    const { password, ...partial } = user;

    return partial;
  }
}
