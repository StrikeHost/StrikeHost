import { User } from 'src/user/user.entity';

export class EmailDTO {
  to: string | User;
  subject: string;
  template: string;
  data: Record<string, any>;
}
