import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { EmailProcessor } from './email.processor';
import * as path from 'path';

const bullModule = BullModule.forRoot({});
@Module({
  imports: [
    bullModule,
    BullModule.registerQueue({
      name: 'email',
    }),
    MailerModule.forRoot({
      transport: `smtp://70e9a8ec098ee4:0ec4eaa009c704@smtp.mailtrap.io:587`,
      defaults: {
        from: '"Strike Host" <noreply@strike.host>',
      },
      template: {
        dir: path.join(process.env.PWD, 'src/email/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
      options: {
        partials: {
          dir: path.join(process.env.PWD, 'src/email/partials'),
          options: {
            strict: true,
          },
        },
      },
    }),
  ],
  exports: [bullModule],
  providers: [EmailProcessor],
})
export class EmailModule {}
