import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { RegisterUserDTO } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtTokenService: JwtService,
    private userService: UserService,
  ) {}

  async register(registerUserDto: RegisterUserDTO): Promise<User> {
    return await this.userService.registerUser(registerUserDto);
  }

  async login(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);

    const validate = await user.comparePassword(password);
    if (validate) {
      return this.loginWithCredentials(user);
    }
  }

  async getCurrentUser(req) {
    return req.user;
  }

  private async loginWithCredentials(user: any) {
    const payload = { username: user.username, sub: user.userId };

    return {
      access_token: this.jwtTokenService.sign(payload, {
        secret: process.env.SECRET,
      }),
    };
  }
}
