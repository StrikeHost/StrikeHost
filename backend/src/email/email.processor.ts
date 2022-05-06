import { Job } from 'bull';
import {
  OnQueueActive,
  OnQueueError,
  OnQueueResumed,
  Process,
  Processor,
} from '@nestjs/bull';

import { Mail } from './Mail';
import { EmailDTO } from './dto/email.dto';
import { User } from 'src/user/user.entity';

@Processor('email')
export class EmailProcessor {
  @OnQueueActive()
  onActive(job: Job) {
    console.log('Email job started');
  }

  @OnQueueError()
  onError(error: Error) {
    console.log('There was an error');
  }

  @OnQueueResumed()
  onResume(job: Job) {
    console.log('resume');
  }

  @Process()
  async handle(job: Job<EmailDTO>) {
    const { to, subject, template, data } = job.data;
    console.log('email handle');

    const mail = new Mail()
      .to(to instanceof User ? to.email : to)
      .subject(subject)
      .template(template)
      .with(data);

    await mail.send();
  }
}
