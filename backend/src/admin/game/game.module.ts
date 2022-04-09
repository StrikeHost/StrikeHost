import { Module } from '@nestjs/common';

import { GameService } from 'src/admin/game/game.service';
import { GameController } from 'src/admin/game/game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameRepository } from 'src/game/game.repository';

@Module({
  imports: [TypeOrmModule.forFeature([GameRepository])],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
