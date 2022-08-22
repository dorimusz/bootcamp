import { Controller, Get } from '@nestjs/common';
import { RepositoryService } from './repository.service';
import { Repository as RepositoryEntity } from '../entity/repository.entity';
@Controller('/repository')
export class RepositoryController {
  constructor(private readonly repositoryService: RepositoryService) {}

  @Get()
  getRepositories(): Promise<RepositoryEntity[]> {
    return this.repositoryService.getAllRepos();
  }
}
