import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import config from 'config';
import { UsersModule } from './users/users.module';
import { validate } from '../env.validation';
import { EventModule } from './events/events.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({ validate })],
      useFactory: config,
      inject: [ConfigService],
    }),
    UsersModule,
    EventModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
