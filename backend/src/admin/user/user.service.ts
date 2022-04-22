import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async getAllUsers() {
    return await this.userRepository.find();
  }

  /**
   * Get a user by id
   *
   * @param {string} userId
   * @param {string[]} relations
   * @returns {Promise<User>}
   */
  async getUser(userId: string, relations?: string[]): Promise<User> {
    const user = await this.userRepository.findOne(userId, { relations });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found!`);
    }

    return user;
  }
}
