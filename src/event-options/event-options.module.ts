import { Module } from '@nestjs/common';
import { EventOptionsService } from './event-options.service';
import { EventOptionsController } from './event-options.controller';
import { EventOptions } from './entities/event-option.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EventOptions])],
  controllers: [EventOptionsController],
  providers: [EventOptionsService],
})
export class EventOptionsModule {}
