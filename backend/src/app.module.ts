import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import 'reflect-metadata'; // needed for typeorm
import config from '../ormconfig';
import { Repository } from './entity/repository.entity';
import { User } from './entity/user.entity';
import { Contribution } from './entity/contribution.entity';

import { GithubModule } from './github/github.module';
import { UserModule } from './user/user.module';
import { RepositoryModule } from './repository/repository.module';
import { ContributionModule } from './contribution/contribution.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(config), //sets up the connection to the database
    TypeOrmModule.forFeature([Repository, User, Contribution]), //forFeature is used to register entities, creates a dynamic provider that has it's own injection token
    GithubModule,
    UserModule,
    RepositoryModule,
    ContributionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//forFeature entity class = repository injectable to service
//repository query builder
