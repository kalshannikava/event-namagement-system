import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity('tags')
export class Tag extends BaseEntity {
  @Column('text', { unique: true })
  name: string;
}
