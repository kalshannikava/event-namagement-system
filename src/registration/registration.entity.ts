import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../base/entities/base.entity';
import { User } from '../users/entities/user.entity';
import { Event } from '../event/entities/event.entity';

@Entity('registrations')
export class Registration extends BaseEntity {
  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  userId: number;

  @ManyToOne(() => Event, (event) => event.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'eventId' })
  eventId: number;
}
