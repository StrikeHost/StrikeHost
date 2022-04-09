import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageVersion } from 'src/image-version/image-version.entity';
import { ImageVersionRepository } from 'src/image-version/image-version.repository';
import { Image } from 'src/image/image.entity';
import { ImageRepository } from 'src/image/image.repository';
import { CreateImageDto } from '../game/dto/create-image.dto';
import { CreateImageVersionDTO } from './dto/create-image-version.dto';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ImageRepository) private imageRepository: ImageRepository,
    @InjectRepository(ImageVersionRepository)
    private imageVersionRepository: ImageVersionRepository,
  ) {}

  /**
   * Retrieve an image from the repo
   *
   * @param {string} imageId
   */
  async getImage(imageId: string): Promise<Image> {
    const image = await this.imageRepository.findOne(imageId);

    if (!image) {
      throw new NotFoundException('Image not found!');
    }

    return image;
  }

  /**
   * Updates an image
   *
   * @param {string} imageId
   * @param {CreateImageDto} updateImageDto
   * @returns {Promise<Image>}
   */
  async updateImage(
    imageId: string,
    updateImageDto: CreateImageDto,
  ): Promise<Image> {
    const image = await this.getImage(imageId);

    const { name, slug, docker_name, min_memory } = updateImageDto;

    image.name = name;
    image.docker_name = docker_name;
    image.min_memory = min_memory;
    await image.save();

    return image;
  }

  /**
   * Retrieves an image version from the repo
   *
   * @param {string} imageVersionId
   * @returns {ImageVersion}
   */
  async getImageVersion(imageVersionId: string): Promise<ImageVersion> {
    const imageVersion = this.imageVersionRepository.findOne(imageVersionId);

    if (!imageVersion) {
      throw new NotFoundException('Image version not found!');
    }

    return imageVersion;
  }

  /**
   * Creates a new image version
   *
   * @param {string} imageId
   * @param {CreateImageVersionDTO} createImageVersionDto
   */
  async createImageVersion(
    imageId: string,
    createImageVersionDto: CreateImageVersionDTO,
  ): Promise<ImageVersion> {
    const image = await this.getImage(imageId);

    const { name, arguments: args } = createImageVersionDto;

    const imageVersion = new ImageVersion();
    imageVersion.name = name;
    imageVersion.arguments = args;
    imageVersion.image = image;
    await imageVersion.save();

    return imageVersion;
  }
}
