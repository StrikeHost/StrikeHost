import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateGameDTO } from './dto/create-game.dto';
import { CreateImageDto } from './dto/create-image.dto';
import { GameService } from './game.service';

@Controller('admin/game')
@UseGuards(JwtAuthGuard)
export class GameController {
  constructor(private gameService: GameService) {}

  @Get()
  async GetGames() {
    const games = await this.gameService.getAllGames();
    return games;
  }

  @Post()
  async CreateGame(@Body() createGameDto: CreateGameDTO) {
    const game = await this.gameService.createGame(createGameDto);

    return game;
  }

  @Get(':gameId')
  async GetGame(@Param('gameId') gameId: string) {
    return await this.gameService.getGame(gameId);
  }

  @Post(':gameId')
  async UpdateGame(
    @Param('gameId') gameId: string,
    @Body() updateGameDto: CreateGameDTO,
  ) {
    const game = await this.gameService.getGame(gameId);

    game.slug = updateGameDto.slug;
    game.name = updateGameDto.name;

    await game.save();

    return game;
  }

  @Post(':gameId/image')
  async CreateImage(
    @Param('gameId') gameId: string,
    @Body() createImageDto: CreateImageDto,
  ) {
    const game = await this.gameService.createImage(gameId, createImageDto);

    return game;
  }
}
