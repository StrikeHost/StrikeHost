import { Controller, Get } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Get()
  async GetGameListings() {
    return await this.gameService.getGameListings();
  }
}
