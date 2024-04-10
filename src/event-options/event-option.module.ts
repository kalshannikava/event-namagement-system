import { Module } from '@nestjs/common';
import { EventOptionsModule } from './event-options.module';

@Module({
  imports: [EventOptionsModule],
})
export class EventOptionModule {}
