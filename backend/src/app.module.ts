import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GithubModule } from './github/github.module';

import 'reflect-metadata'; // needed for typeorm
import config from '../ormconfig';
@Module({
  imports: [TypeOrmModule.forRoot(config), GithubModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//for feature entity class = repository injectable to service
//repository query builder
