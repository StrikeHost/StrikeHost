import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { EmailProcessor } from './email.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'email',
    }),
  ],
  exports: [
    BullModule
  ],
  providers: [EmailProcessor],
})
export class EmailModule {}
