import { IsNumber, IsString } from 'class-validator';

export class CreateImageDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  docker_name: string;

  @IsNumber()
  min_memory: number;
}
