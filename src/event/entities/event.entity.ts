import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../base/entities/base.entity';
import { User } from '../../users/entities/user.entity';

@Entity('events')
export class Event extends BaseEntity {
  @Column('text')
  name: string;

  @Column('text')
  description: string;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ownerId' })
  ownerId: number;
}
