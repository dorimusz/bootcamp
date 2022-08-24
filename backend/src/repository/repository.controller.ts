import { Controller, Get, Inject, Param } from '@nestjs/common';
// import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
// import { Logger } from 'winston';
import { RepositoryService } from './repository.service';
import { Repository as RepositoryEntity } from '../entity/repository.entity';
@Controller('/repository')
export class RepositoryController {
  constructor(
    private readonly repositoryService: RepositoryService, // @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get()
  async agetRepositories(): Promise<RepositoryEntity[]> {
    return await this.repositoryService.getAllRepos();
  }

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<RepositoryEntity> {
    return await this.repositoryService.getRepoById(id);
  }
}
