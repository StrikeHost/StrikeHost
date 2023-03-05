import { Job } from 'bull';
import {
  OnQueueActive,
  OnQueueError,
  OnQueueResumed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Injectable } from '@nestjs/common';

import { EmailDTO } from './dto/email.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
@Processor('email')
export class EmailProcessor {
  constructor(private readonly mailerService: MailerService) {}

  @OnQueueError()
  onError(error: Error) {
    console.log('There was an error', error);
  }

  @Process('email')
  async handle(job: Job<EmailDTO>) {
    const { to, subject, template, data } = job.data;
    data.subject = subject;

    console.log(to, subject, template, data);
    this.mailerService
      .sendMail({
        to,
        subject,
        template,
        context: data,
      })
      .then((e) => {
        console.log(e);
      })
      .catch((e) => {
        console.log(e);
      });

    return true;
  }
}
