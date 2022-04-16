import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateImageDto } from '../game/dto/create-image.dto';
import { CreateImageVersionDTO } from './dto/create-image-version.dto';
import { ImageService } from './image.service';

@Controller('admin/image')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Get(':imageId')
  async GetImage(@Param('imageId') imageId: string) {
    const image = await this.imageService.getImage(imageId, ['versions']);

    return image;
  }

  @Post(':imageId')
  async UpdateImage(
    @Param('imageId') imageId: string,
    @Body() updateImageDto: CreateImageDto,
  ) {
    const image = await this.imageService.updateImage(imageId, updateImageDto);

    return image;
  }

  @Get(':imageId/version/:versionId')
  async GetImageVersion(
    @Param('imageId') imageId: string,
    @Param('versionId') versionId: string,
  ) {
    const imageVersion = await this.imageService.getImageVersion(versionId, [
      'image',
    ]);

    return imageVersion;
  }

  @Post(':imageId/version')
  async CreateImageVersion(
    @Param('imageId') imageId: string,
    @Body() createImageVersionDto: CreateImageVersionDTO,
  ) {
    const imageVersion = await this.imageService.createImageVersion(
      imageId,
      createImageVersionDto,
    );

    return imageVersion;
  }

  @Post(':imageId/version/:versionId')
  async UpdateImageVersion(
    @Param('imageId') imageId: string,
    @Param('versionId') versionId: string,
    @Body() updateImageVersionDto: CreateImageVersionDTO,
  ) {
    const imageVersion = await this.imageService.updateImageVersion(
      versionId,
      updateImageVersionDto,
    );

    return imageVersion;
  }
}
