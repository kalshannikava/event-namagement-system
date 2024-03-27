import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { BaseController } from 'src/base/base.controller';
import { Event } from './entities/event.entity';

@Controller('event')
export class EventsController extends BaseController<Event> {
  constructor(private readonly eventsService: EventsService) {
    super(eventsService);
  }

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return super.create(createEventDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return super.update(id, updateEventDto);
  }
}
