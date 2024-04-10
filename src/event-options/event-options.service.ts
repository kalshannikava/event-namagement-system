import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { EventOptions } from './entities/event-option.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EventOptionsService extends BaseService<EventOptions> {
  constructor(
    @InjectRepository(EventOptions)
    eventOptionsRepository: Repository<EventOptions>,
  ) {
    super(eventOptionsRepository);
  }
}
