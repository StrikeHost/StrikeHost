import { IsEmail, IsNotEmpty } from 'class-validator';

export class EmailDTO {
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  template: string;

  data: Record<string, any>;
}
