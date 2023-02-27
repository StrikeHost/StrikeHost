import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventRepository } from './event.repository';
import { Event } from './event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventRepository) private eventRepository: EventRepository,
  ) {}

  /**
   * Get all events
   *
   * @returns {Promise<Event[]>}
   */
  async getAllEvents(): Promise<Event[]> {
    return await this.eventRepository.find();
  }
}
