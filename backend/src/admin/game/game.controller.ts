import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { CreateGameDTO } from './dto/create-game.dto';
import { CreateImageDto } from './dto/create-image.dto';
import { GameService } from './game.service';

@Controller('admin/game')
@UseGuards(AdminGuard)
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
    return await this.gameService.getGame(gameId, ['images']);
  }

  @Post(':gameId')
  async UpdateGame(
    @Param('gameId') gameId: string,
    @Body() updateGameDto: CreateGameDTO,
  ) {
    return await this.gameService.updateGame(gameId, updateGameDto);
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
