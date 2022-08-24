import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/game/game.entity';
import { GameRepository } from 'src/game/game.repository';
import { ImageVersion } from 'src/image-version/image-version.entity';
import { ImageVersionRepository } from 'src/image-version/image-version.repository';
import { Image } from 'src/image/image.entity';
import { ImageRepository } from 'src/image/image.repository';
import { CreateImageDto } from '../game/dto/create-image.dto';
import { CreateImageVersionDTO } from './dto/create-image-version.dto';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(GameRepository)
    private gameRepository: GameRepository,
    @InjectRepository(ImageRepository)
    private imageRepository: ImageRepository,
    @InjectRepository(ImageVersionRepository)
    private imageVersionRepository: ImageVersionRepository,
  ) {}

  /**
   * Retrieve an image from the repo
   *
   * @param {string} imageId
   */
  async getImage(imageId: string, relations?: string[]): Promise<Image> {
    const image = await this.imageRepository.findOne(imageId, { relations });

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

    const {
      name,
      slug,
      docker_name,
      min_memory,
      arguments: args,
      min_cpu,
      min_storage,
    } = updateImageDto;

    image.name = name;
    image.arguments = args;
    image.docker_name = docker_name;
    image.min_cpu = min_cpu;
    image.min_memory = min_memory;
    image.min_storage = min_storage;

    await image.save();

    return image;
  }

  /**
   * Retrieves an image version from the repo
   *
   * @param {string} imageVersionId
   * @returns {ImageVersion}
   */
  async getImageVersion(
    imageVersionId: string,
    relations?: string[],
  ): Promise<ImageVersion> {
    const imageVersion = this.imageVersionRepository.findOne(imageVersionId, {
      relations,
    });

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

    const {
      name,
      arguments: args,
      docker_name,
      min_cpu,
      min_memory,
      min_storage,
    } = createImageVersionDto;

    const imageVersion = new ImageVersion();
    imageVersion.name = name;
    imageVersion.arguments = args;
    imageVersion.image = image;
    imageVersion.docker_name = docker_name;
    imageVersion.min_cpu = min_cpu;
    imageVersion.min_memory = min_memory;
    imageVersion.min_storage = min_storage;
    await imageVersion.save();

    return imageVersion;
  }

  /**
   * Updates an image version
   *
   * @param {string} imageVersionId
   * @param {CreateImageVersionDTO} updateImageVersionDto
   * @returns
   */
  async updateImageVersion(
    imageVersionId: string,
    updateImageVersionDto: CreateImageVersionDTO,
  ): Promise<ImageVersion> {
    const imageVersion = await this.getImageVersion(imageVersionId);

    const { name, arguments: args } = updateImageVersionDto;

    imageVersion.name = name;
    imageVersion.arguments = args;
    await imageVersion.save();

    return imageVersion;
  }

  /**
   * Returns a listing of available game images
   *
   * @returns
   */
  public async getImageListings(): Promise<Game[]> {
    return await this.gameRepository.find({
      relations: ['image', 'image.version'],
    });
  }
}
