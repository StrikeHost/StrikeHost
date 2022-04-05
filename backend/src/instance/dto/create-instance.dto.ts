import { IsString } from 'class-validator';

export class CreateInstanceDTO {
  @IsString()
  game_id: string;

  @IsString()
  image_id: string;

  @IsString()
  version_id: string;
}
