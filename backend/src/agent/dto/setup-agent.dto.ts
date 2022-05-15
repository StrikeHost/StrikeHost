import { IsNumber, IsObject, IsString } from 'class-validator';
import { User } from 'src/user/user.entity';

export class SetupAgentSpecsDto {
  @IsNumber()
  cores: number;

  @IsNumber()
  storage: number;

  @IsNumber()
  total_memory: number;
}

export class SetupAgentDto {
  @IsString()
  token: string;

  @IsObject()
  specs: SetupAgentSpecsDto;

  @IsString()
  publicAddress: string;
}
