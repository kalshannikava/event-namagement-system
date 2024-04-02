import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRegistrationDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  eventId: number;
}
