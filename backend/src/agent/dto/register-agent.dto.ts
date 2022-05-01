import { IsNumber, IsObject, IsString } from 'class-validator';
import { User } from 'src/user/user.entity';

export class RegisterAgentSpecsDto {
  @IsNumber()
  cores: number;

  @IsNumber()
  total_memory: number;
}

export class RegisterAgentDto {
  @IsString()
  decodedToken: User;

  @IsObject()
  specs: RegisterAgentSpecsDto;

  @IsString()
  publicAddress: string;
}
