import { Entity, Column } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../base/entities/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column('text', { unique: true })
  login: string;

  @Exclude()
  @Column('text')
  password: string;
}
