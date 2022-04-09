import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameRepository } from 'src/game/game.repository';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameRepository) private gameRepository: GameRepository,
  ) {}

  async getAllGames() {
    return this.gameRepository.find();
  }
}
