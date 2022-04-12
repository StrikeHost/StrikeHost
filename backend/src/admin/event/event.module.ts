import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventModule as RootEventModule } from 'src/event/event.module';

@Module({
  imports: [RootEventModule],
  controllers: [EventController],
})
export class EventModule {}
