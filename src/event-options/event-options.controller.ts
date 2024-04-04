import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { EventOptionsService } from './event-options.service';
import { CreateEventOptionDto } from './dto/create-event-option.dto';
import { UpdateEventOptionDto } from './dto/update-event-option.dto';
import { BaseController } from '../base/base.controller';
import { EventOptions } from './entities/event-option.entity';

@Controller('event-options')
export class EventOptionsController extends BaseController<EventOptions> {
  constructor(private readonly eventOptionsService: EventOptionsService) {
    super(eventOptionsService);
  }

  @Post()
  create(@Body() createEventOptionDto: CreateEventOptionDto) {
    return super.create(createEventOptionDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateEventOptionDto: UpdateEventOptionDto,
  ) {
    return super.update(id, updateEventOptionDto);
  }
}
