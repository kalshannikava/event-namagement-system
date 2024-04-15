import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import config from 'config';
import { UsersModule } from './users/users.module';
import { validate } from '../env.validation';
import { EventModule } from './events/events.module';
import { RegistrationsModule } from './registrations/registrations.module';
import { EventOptionModule } from './event-options/event-option.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { TagsModule } from './tags/tags.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({ validate })],
      useFactory: config,
      inject: [ConfigService],
    }),
    UsersModule,
    EventModule,
    EventOptionModule,
    RegistrationsModule,
    FeedbacksModule,
    TagsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
