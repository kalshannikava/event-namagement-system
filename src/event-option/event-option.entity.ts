import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../base/entities/base.entity';
import { Tag } from '../tag/tag.entity';
import { Event } from '../event/event.entity';

@Entity('event_options')
export class EventOptions extends BaseEntity {
  @ManyToOne(() => Tag, (tag) => tag.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tagId' })
  tagId: number;

  @ManyToOne(() => Event, (event) => event.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'eventId' })
  eventId: number;
}
