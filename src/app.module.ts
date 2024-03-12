import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import config from 'config';

@Module({
  imports: [TypeOrmModule.forRoot(config as TypeOrmModuleOptions)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
