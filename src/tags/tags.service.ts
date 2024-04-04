import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { Tag } from './entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService extends BaseService<Tag> {
  constructor(@InjectRepository(Tag) tagsRepository: Repository<Tag>) {
    super(tagsRepository);
  }
}
