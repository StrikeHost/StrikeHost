import { Controller, Get } from '@nestjs/common';
import { EventService } from 'src/event/event.service';

@Controller('admin/event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Get()
  async GetEvents() {
    return await this.eventService.getAllEvents();
  }
}
