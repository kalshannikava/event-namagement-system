import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Feedback } from './entities/feedback.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FeedbacksService extends BaseService<Feedback> {
  constructor(
    @InjectRepository(Feedback) feedbacksRepository: Repository<Feedback>,
  ) {
    super(feedbacksRepository);
  }
}
