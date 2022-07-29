import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedResponse } from 'src/interfaces/PaginatedResponse';
import { User } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async getAllUsers(
    skip?: number,
    count: number = 20,
  ): Promise<PaginatedResponse<User>> {
    const [results, selected] = await this.userRepository.findAndCount({
      skip,
      take: count,
      relations: ['instances'],
    });

    return {
      results,
      count: selected,
    };
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
