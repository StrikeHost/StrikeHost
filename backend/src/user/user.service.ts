import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { RegisterUserDTO } from 'src/auth/dto/register-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  public async registerUser(registerUserDto: RegisterUserDTO): Promise<User> {
    return await this.userRepository.registerUser(registerUserDto);
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

  public async getUserByDiscordId(discordId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { discord_id: discordId },
      relations: [
        'instances',
        'instances.image',
        'instances.version',
        'instances.image.game',
        'instances.agent',
      ],
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
