import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';
import { Repository } from '../entity/repository.entity';
import { User } from '../entity/user.entity';
import { Contribution } from '../entity/contribution.entity';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Repository, User, Contribution]),
  ],
  controllers: [GithubController],
  providers: [GithubService],
})
export class GithubModule {}
//repo classok metodust szolgaltatnak
