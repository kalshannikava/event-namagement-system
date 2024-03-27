import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../base/entities/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column('text', { unique: true })
  login: string;
}
