import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageRepository } from './image.repository';
import { ImageGateway } from './image.gateway';
import { ImageModule as AdminImageModule } from 'src/admin/image/image.module';

@Module({
  imports: [TypeOrmModule.forFeature([ImageRepository]), AdminImageModule],
  providers: [ImageGateway],
})
export class ImageModule {}
