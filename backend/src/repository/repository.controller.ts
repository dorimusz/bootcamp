import {
  Controller,
  Get,
  Param,
  Req,
  Res,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  Query,
  Body,
} from '@nestjs/common';
// import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
// import { Logger } from 'winston';
import { Request, Response } from 'express';
import { RepositoryService } from './repository.service';
import { ContributionService } from 'src/contribution/contribution.service';
import { Repository as RepositoryEntity } from '../entity/repository.entity';
import { ApiResponseService } from 'src/utils/apiResponse.service';
@Controller('/repository')
export class RepositoryController {
  constructor(
    private readonly repositoryService: RepositoryService, // @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly contributionService: ContributionService,
    private readonly apiResponseService: ApiResponseService,
  ) {}

  @Get('/')
  async getRepositories(
    @Query()
    query: { language: string; stargazer_count: number; ownerId: number },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    console.log(query.language || query.stargazer_count || query.ownerId); //query.language {language: 'Ruby'}
    // if (query.language || query.stargazer_count || query.ownerId) {
    const queryRepo = await this.repositoryService.searchRepositories(
      query.language,
      query.stargazer_count,
      query.ownerId,
    );
    this.apiResponseService.customApiResponse(
      res,
      queryRepo,
      'No repos found built with this language.',
      'An error occured.',
    );
    // } else {
    //   const repositories = await this.repositoryService.getAllRepos();
    //   this.apiResponseService.customApiResponse(
    //     res,
    //     repositories,
    //     'No repositories found.',
    //     'Error getting repositories.',
    //   );
    // }
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
    const contributions =
      await this.contributionService.getAllContributionsByRepoId(id);
    // console.log('@@contrib', contributions.length);
    // console.log('@@contrib', contributions);
    this.apiResponseService.customApiResponseForArrays(
      res,
      contributions,
      'The repository might not exist.',
      'Error getting contributions.',
    );
  }

  // @Get('/test')
  // async getContributors(
  //   // @Param('full_name', ParseIntPipe) full_name: string,
  //   @Res() res: Response,
  // ) {
  //   const repository = await this.repositoryService.getContributors(full_name);
  //   console.log('@@repository', repository);
  //   res.send(repository);
  // }
}
