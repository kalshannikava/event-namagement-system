import { PartialType } from '@nestjs/mapped-types';
import { CreateEventOptionDto } from './create-event-option.dto';

export class UpdateEventOptionDto extends PartialType(CreateEventOptionDto) {}
