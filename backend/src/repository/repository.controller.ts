import { Controller, Get, Param } from '@nestjs/common';
import { RepositoryService } from './repository.service';
import { Repository as RepositoryEntity } from '../entity/repository.entity';
@Controller('/repository')
export class RepositoryController {
  constructor(private readonly repositoryService: RepositoryService) {}

  @Get()
  async agetRepositories(): Promise<RepositoryEntity[]> {
    return await this.repositoryService.getAllRepos();
  }

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<RepositoryEntity> {
    return await this.repositoryService.getRepoById(id);
  }
}
