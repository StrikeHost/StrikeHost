import { IsString } from 'class-validator';

export class InstanceConsoleDto {
  @IsString()
  instanceId: string;

  @IsString()
  text: string;
}
