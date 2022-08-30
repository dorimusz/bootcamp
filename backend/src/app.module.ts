import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { LoggerConfig } from './config/logger.config';

import config from '../ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'reflect-metadata'; // needed for typeorm

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RequestMiddleware } from './middlewares/request.middleware';

import { Repository } from './entity/repository.entity';
import { User } from './entity/user.entity';
import { Contribution } from './entity/contribution.entity';

import { GithubModule } from './github/github.module';
import { UserModule } from './user/user.module';
import { RepositoryModule } from './repository/repository.module';
import { ContributionModule } from './contribution/contribution.module';
import { ApiResponseModule } from './utils/apiResponse.module';

import { ContributionController } from './contribution/contribution.controller';
import { RepositoryController } from './repository/repository.controller';
import { UserController } from './user/user.controller';
import { GithubController } from './github/github.controller';

const logger: LoggerConfig = new LoggerConfig();
@Module({
  imports: [
    TypeOrmModule.forRoot(config), //sets up the connection to the database
    TypeOrmModule.forFeature([Repository, User, Contribution]), //forFeature is used to register entities, creates a dynamic provider that has it's own injection token
    WinstonModule.forRoot(logger.console()),
    GithubModule,
    UserModule,
    RepositoryModule,
    ContributionModule,
    ApiResponseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestMiddleware)
      .forRoutes(
        AppController,
        ContributionController,
        RepositoryController,
        UserController,
        GithubController,
      );
  }
}

//forFeature entity class = repository injectable to service
//repository query builder
