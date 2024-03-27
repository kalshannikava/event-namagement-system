import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { BaseService } from 'src/base/base.service';

@Injectable()
export class EventsService extends BaseService<Event> {
  constructor(@InjectRepository(Event) eventsRepository: Repository<Event>) {
    super(eventsRepository);
  }
}
