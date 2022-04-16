import { IsString } from 'class-validator';

export class CreateImageVersionDTO {
  @IsString()
  name: string;

  @IsString()
  arguments: string;
}
