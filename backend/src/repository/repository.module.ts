import { Module } from '@nestjs/common';
import { RepositoryController } from './repository.controller';
import { RepositoryService } from './repository.service';
import { Repository } from '../entity/repository.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContributionService } from '../contribution/contribution.service';
import { Contribution } from '../entity/contribution.entity';
import { ContributionModule } from 'src/contribution/contribution.module';
// import { ApiResponseService } from '../utils/apiResponse.service';

@Module({
  imports: [TypeOrmModule.forFeature([Repository]), ContributionModule],
  controllers: [RepositoryController],
  providers: [RepositoryService],
})
export class RepositoryModule {}
