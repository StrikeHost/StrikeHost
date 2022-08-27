import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameRepository } from 'src/game/game.repository';
import { ImageVersionRepository } from 'src/image-version/image-version.repository';
import { ImageRepository } from 'src/image/image.repository';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GameRepository,
      ImageRepository,
      ImageVersionRepository,
    ]),
  ],
  controllers: [ImageController],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {}
