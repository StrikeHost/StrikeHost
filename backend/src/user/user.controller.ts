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

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { getRepository } from 'typeorm';
import { User } from './user.entity';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  @Get()
  async get(@Req() req) {
    const { password, ...user } = req.user;
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
