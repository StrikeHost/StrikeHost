import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageVersionRepository } from './image-version.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ImageVersionRepository])],
  exports: [],
})
export class ImageVersionModule {}
