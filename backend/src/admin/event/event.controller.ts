import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { EventService } from 'src/event/event.service';

@Controller('admin/event')
@UseGuards(AdminGuard)
export class EventController {
  constructor(private eventService: EventService) {}

  @Get()
  async GetEvents() {
    return await this.eventService.getAllEvents();
  }
}
