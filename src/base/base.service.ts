import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  DeepPartial,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { GetAllDto } from './dto/getAll.dto';
@Injectable()
export abstract class BaseService<T extends ObjectLiteral> {
  constructor(protected repository: Repository<T>) {}

  async create(createBaseDto: DeepPartial<T>): Promise<T> {
    return await this.repository.save(createBaseDto);
  }

  async findAll(query: GetAllDto): Promise<{ result: T[]; total: number }> {
    const take = query?.take || 10;
    const skip = query?.skip || 0;

    const [result, total] = await this.repository.findAndCount({
      take,
      skip,
      loadRelationIds: true,
    });

    return {
      result,
      total,
    };
  }

  async findOne(id: number): Promise<T | null> {
    const options = {
      where: {
        id,
      },
      loadRelationIds: true,
    } as unknown as FindOptionsWhere<T>;
    const result = await this.repository.findOne(options);
    if (!result) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async findOneBy(option: FindOptionsWhere<T>): Promise<T | null> {
    return await this.repository.findOneBy(option);
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
