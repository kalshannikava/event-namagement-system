import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { BaseService } from './base.service';
import { BaseEntity } from './entities/base.entity';
import { Public } from 'src/auth/decorators/public.decorator';
import { GetAllDto } from './dto/getAll.dto';

export abstract class BaseController<T extends BaseEntity> {
  constructor(private readonly baseService: BaseService<T>) {}

  @Post()
  create(@Body() createBaseDto: DeepPartial<T>) {
    return this.baseService.create(createBaseDto);
  }

  @Public()
  @Get()
  findAll(@Query() query: GetAllDto) {
    return this.baseService.findAll(query);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.baseService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateBaseDto: QueryDeepPartialEntity<T>,
  ) {
    return this.baseService.update(+id, updateBaseDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.baseService.remove(+id);
  }
}
