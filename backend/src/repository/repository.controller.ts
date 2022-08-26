import {
  Controller,
  Get,
  Param,
  Req,
  Res,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
// import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
// import { Logger } from 'winston';
import { Request, Response } from 'express';
import { RepositoryService } from './repository.service';
import { Repository as RepositoryEntity } from '../entity/repository.entity';
import { ApiResponseService } from 'src/utils/apiResponse.service';
@Controller('/repository')
export class RepositoryController {
  constructor(
    private readonly repositoryService: RepositoryService, // @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly contributionService: RepositoryService,
    private readonly apiResponseService: ApiResponseService,
  ) {}

  @Get()
  async getRepositories(@Req() req: Request, @Res() res: Response) {
    const repositories = await this.repositoryService.getAllRepos();
    this.apiResponseService.customApiResponse(
      res,
      repositories,
      'No repositories found.',
      'Error getting repositories.',
    );
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const repository = await this.repositoryService.getRepoById(id);
    // if (repository) return repository;
    // else throw new HttpException('Not found', HttpStatus.BAD_REQUEST);
    this.apiResponseService.customApiResponse(
      res,
      repository,
      'Repository not found.',
      'Error getting repository.',
    );
  }

  @Get('/:id/contributions')
  async findContributions(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const contributions = await this.contributionService.findContributions(id);
    console.log(contributions.length);
    this.apiResponseService.customApiResponseForConts(
      res,
      contributions,
      'The repository might not exist.',
      'Error getting contributions.',
    );
  }
}
