import { Injectable } from '@nestjs/common';
import {
  DeepPartial,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export abstract class BaseService<T extends ObjectLiteral> {
  constructor(protected repository: Repository<T>) {}

  async create(createBaseDto: DeepPartial<T>): Promise<T> {
    return await this.repository.save(createBaseDto);
  }

  findAll(): Promise<T[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<T | null> {
    const options = { id } as unknown as FindOptionsWhere<T>;
    return this.repository.findOneBy(options);
  }

  async update(
    id: number,
    updateBaseDto: QueryDeepPartialEntity<T>,
  ): Promise<T | null> {
    await this.repository.update(id, updateBaseDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
