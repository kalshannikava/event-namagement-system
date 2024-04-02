import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { BaseController } from 'src/base/base.controller';
import { Registration } from './entities/registration.entity';

@Controller('registrations')
export class RegistrationsController extends BaseController<Registration> {
  constructor(private readonly registrationsService: RegistrationsService) {
    super(registrationsService);
  }

  @Post()
  create(@Body() createRegistrationDto: CreateRegistrationDto) {
    return super.create(createRegistrationDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateRegistrationDto: UpdateRegistrationDto,
  ) {
    return super.update(id, updateRegistrationDto);
  }
}
