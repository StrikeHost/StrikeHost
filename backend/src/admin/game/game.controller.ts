import { Controller, Get } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('admin/game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Get()
  async GetGames() {
    const games = await this.gameService.getAllGames();
    return games;
  }
}
