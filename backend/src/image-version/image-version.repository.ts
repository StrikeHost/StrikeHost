import { EntityRepository, Repository } from 'typeorm';
import { ImageVersion } from './image-version.entity';

@EntityRepository(ImageVersion)
export class ImageVersionRepository extends Repository<ImageVersion> {}
