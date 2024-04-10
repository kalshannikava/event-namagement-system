import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { BaseController } from '../base/base.controller';
import { Tag } from './entities/tag.entity';

@Controller('tags')
export class TagsController extends BaseController<Tag> {
  constructor(private readonly tagsService: TagsService) {
    super(tagsService);
  }

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return super.create(createTagDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateTagDto: UpdateTagDto,
  ) {
    return super.update(id, updateTagDto);
  }
}
