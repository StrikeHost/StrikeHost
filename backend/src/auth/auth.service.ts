import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { RegisterUserDTO } from './dto/register-user.dto';
import { Agent } from 'src/agent/agent.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtTokenService: JwtService,
    private userService: UserService,
  ) {}

  /**
   * Registers a user with the specified credentials
   *
   * @param {RegisterUserDTO} registerUserDto
   * @returns {Promise<User>}
   */
  async register(registerUserDto: RegisterUserDTO): Promise<User> {
    return await this.userService.registerUser(registerUserDto);
  }

  /**
   * Logs a user in with the specified credentials
   *
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{ access_token: string }>}
   */
  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.getUserByEmail(email);

    const validate = await user.comparePassword(password);
    if (validate) {
      return this.loginWithCredentials(user);
    }
  }

  async getCurrentUser(req) {
    return req.user;
  }

  /**
   * Creates a new token for an agent
   *
   * @param {Agent} agent
   * @returns {Promise<string>}
   */
  async loginAgent(agent: Agent): Promise<string> {
    const payload = { sub: agent.id };

    return this.jwtTokenService.sign(payload, {
      secret: process.env.SECRET,
    });
  }

  decodeAgent(token: string): Agent {
    return this.jwtTokenService.decode(token) as Agent;
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
