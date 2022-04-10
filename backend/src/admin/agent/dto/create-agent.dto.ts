import { IsString } from 'class-validator';

export class CreateAgentDTO {
  @IsString()
  ip: string;
}
