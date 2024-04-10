import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../base/entities/base.entity';
import { Tag } from '../../tags/tag.entity';
import { Event } from '../../events/entities/event.entity';

@Entity('event_options')
export class EventOptions extends BaseEntity {
  @ManyToOne(() => Tag, (tag) => tag.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tagId' })
  tagId: number;

  @ManyToOne(() => Event, (event) => event.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'eventId' })
  eventId: number;
}
