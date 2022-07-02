import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateImageDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  @IsOptional()
  docker_name?: string;

  @IsNumber()
  @IsOptional()
  min_memory?: number;

  @IsNumber()
  @IsOptional()
  min_storage?: number;

  @IsNumber()
  @IsOptional()
  min_cpu?: number;

  @IsObject()
  @IsOptional()
  arguments?: Record<string, string>;
}
