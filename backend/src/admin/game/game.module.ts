import { Module } from '@nestjs/common';

import { GameService } from 'src/admin/game/game.service';
import { GameController } from 'src/admin/game/game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameRepository } from 'src/game/game.repository';
import { ImageRepository } from 'src/image/image.repository';

@Module({
  imports: [TypeOrmModule.forFeature([GameRepository, ImageRepository])],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
