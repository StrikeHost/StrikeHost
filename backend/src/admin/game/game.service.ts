import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/game/game.entity';
import { GameRepository } from 'src/game/game.repository';
import { Image } from 'src/image/image.entity';
import { ImageRepository } from 'src/image/image.repository';
import { CreateGameDTO } from './dto/create-game.dto';
import { CreateImageDto } from './dto/create-image.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameRepository) private gameRepository: GameRepository,
    @InjectRepository(ImageRepository) private imageRepository: ImageRepository,
  ) {}

  async getAllGames() {
    return this.gameRepository.find();
  }

  /**
   * Retrieve a game from the repo
   *
   * @param {string} gameId
   * @returns {Game}
   */
  async getGame(gameId: string, relations?: string[]): Promise<Game> {
    const game = await this.gameRepository.findOne(gameId, { relations });

    if (!game) {
      throw new NotFoundException();
    }

    return game;
  }

  /**
   * Creates a new game
   *
   * @param {CreateGameDTO} createGameDto
   * @returns {Game}
   */
  async createGame(createGameDto: CreateGameDTO): Promise<Game> {
    const { name, slug } = createGameDto;
    const game = new Game();
    game.name = name;
    game.slug = slug;
    await game.save();

    return game;
  }

  /**
   * Creates a new image
   *
   * @param {string} gameId
   * @param {CreateImageDto} createImageDto
   * @returns {Image}
   */
  async createImage(
    gameId: string,
    createImageDto: CreateImageDto,
  ): Promise<Image> {
    const game = await this.getGame(gameId);

    const { name, slug, docker_name, min_memory } = createImageDto;

    const image = new Image();
    image.name = name;
    image.docker_name = docker_name;
    image.min_memory = min_memory;
    image.game = game;
    await image.save();

    return image;
  }
}
