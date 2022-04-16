import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { RegisterUserDTO } from 'src/auth/dto/register-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectQueue('email') private emailQueue: Queue,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  public async registerUser(registerUserDto: RegisterUserDTO): Promise<User> {
    const user = await this.userRepository.registerUser(registerUserDto);

    await this.emailQueue.add('verify-email', {
      to: user,
      subject: 'Verify Your Email',
      template: 'user/verify',
      data: {
        user: user,
        link: `${process.env.BASE_URL}/verify`,
      },
    });

    return user;
  }

  public async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async getUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  public async getUserByEmail(
    email: string,
    includePassword?: boolean,
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['password'],
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  public async editUser(
    userId: string,
    registerUserDto: RegisterUserDTO,
  ): Promise<User> {
    const editedUser = await this.userRepository.findOne(userId);

    if (!editedUser) {
      throw new NotFoundException('User not found!');
    }

    return await this.userRepository.editUser(registerUserDto, editedUser);
  }

  public async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
