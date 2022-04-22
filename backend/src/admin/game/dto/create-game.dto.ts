import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGameDTO {
  @IsString()
  name: string;

  @IsString()
  slug: string;
}
