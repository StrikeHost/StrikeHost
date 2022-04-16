import { Job } from 'bull';
import { Process, Processor } from '@nestjs/bull';
import { EmailDTO } from './dto/email.dto';
import { Mail } from './Mail';
import { User } from 'src/user/user.entity';

@Processor('email')
export class EmailProcessor {
  @Process()
  async handle(job: Job<EmailDTO>) {
    const { to, subject, template, data } = job.data;

    const mail = new Mail()
      .to(to instanceof User ? to.email : to)
      .subject(subject)
      .template(template)
      .with(data);

    await mail.send();
  }
}
