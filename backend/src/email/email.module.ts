import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'email',
    }),
  ],
  exports: [
    BullModule.registerQueue({
      name: 'email',
    }),
  ],
})
export class EmailModule {}
