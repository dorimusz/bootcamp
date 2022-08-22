import { Module } from '@nestjs/common';
import { RepositoryController } from './repository.controller';
import { RepositoryService } from './repository.service';
import { Repository } from '../entity/repository.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Repository])],
  controllers: [RepositoryController],
  providers: [RepositoryService],
})
export class RepositoryModule {}
