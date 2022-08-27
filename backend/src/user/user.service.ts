import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { RegisterUserDTO } from 'src/auth/dto/register-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectQueue('email') private emailQueue: Queue,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async registerUser(registerUserDto: RegisterUserDTO): Promise<User> {
    const user = await this.userRepository.registerUser(registerUserDto);
    this.verifyEmail(user);

    return user;
  }

  public async verifyEmail(user: User) {
    const token = this.jwtService.sign(
      { email: user.email },
      {
        secret: process.env.SECRET,
        expiresIn: '1h',
      },
    );

    await this.emailQueue.add('email', {
      to: user.email,
      subject: 'Verify Your Email',
      template: 'user-verify',
      data: {
        user: user,
        link: `${process.env.BASE_URL}verify?token=${token}`,
      },
    });
  }

  public async confirmEmail(email: string) {
    const user = await this.userRepository.findOneOrFail({ email: email });

    if (user.email_verified_at) {
      throw new BadRequestException('Email already confirmed');
    }

    await this.userRepository.verifyEmail(user);
    return user;
  }

  public async decodeEmailToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: process.env.SECRET,
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }

      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredErrror') {
        throw new BadRequestException('Token expired.');
      }

      throw new BadRequestException('Bad token');
    }
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
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.id as id',
        'user.email as email',
        'user.password as password',
      ])
      .where('user.email = :email', { email })
      .getRawOne();

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
