import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Registration } from './entities/registration.entity';
import { BaseService } from 'src/base/base.service';

@Injectable()
export class RegistrationsService extends BaseService<Registration> {
  constructor(
    @InjectRepository(Registration)
    registrationRepository: Repository<Registration>,
  ) {
    super(registrationRepository);
  }
}
