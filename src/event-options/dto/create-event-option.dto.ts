import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateEventOptionDto {
  @IsNumber()
  @IsNotEmpty()
  tagId: number;

  @IsNumber()
  @IsNotEmpty()
  eventId: number;
}
