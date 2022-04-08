import { Controller, Get } from '@nestjs/common';

@Controller('admin/game')
export class GameController {
  constructor(private gameRepository: GameRepository) {}

  @Get()
  async GetGames() {
    const games = await 
  }
}
