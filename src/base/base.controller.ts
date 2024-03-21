import { Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseService } from './base.service';
import { BaseEntity } from './entities/base.entity';

export abstract class BaseController<T extends BaseEntity> {
  constructor(private readonly baseService: BaseService<T>) {}

  @Post()
  create(@Body() createBaseDto: DeepPartial<T>) {
    return this.baseService.create(createBaseDto);
  }

  @Get()
  findAll() {
    return this.baseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.baseService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBaseDto: QueryDeepPartialEntity<T>,
  ) {
    return this.baseService.update(+id, updateBaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.baseService.remove(+id);
  }
}
