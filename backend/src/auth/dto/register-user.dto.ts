import { IsString } from 'class-validator';

export class RegisterUserDTO {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;
}
