import { IsObject, IsString } from 'class-validator';

export class CreateImageVersionDTO {
  @IsString()
  name: string;

  @IsObject()
  arguments: Record<string, string>;
}
