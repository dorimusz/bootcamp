import {
  Controller,
  Get,
  Param,
  Res,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  Query,
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common';
// import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
// import { Logger } from 'winston';
import { Request, Response } from 'express';
import { RepositoryService } from './repository.service';
import { ContributionService } from 'src/contribution/contribution.service';
import { Repository as RepositoryEntity } from './repository.entity';
import { ApiResponseService } from 'src/utils/apiResponse.service';
@Controller('/repository')
export class RepositoryController {
  constructor(
    private readonly repositoryService: RepositoryService, // @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly contributionService: ContributionService, // private readonly apiResponseService: ApiResponseService, // no need fot this - using HttpException instead
  ) {}

  // @UseInterceptors(CacheInterceptor)
  @Get('/')
  async getRepositories(
    @Query()
    query: { language: string; stargazer_count: number; ownerId: number },
    @Res() res: Response,
  ) {
    // console.log(query.language || query.stargazer_count || query.ownerId); //query.language {language: 'Ruby'}
    const queryRepo = await this.repositoryService.searchRepositories(
      query.language,
      query.stargazer_count,
      query.ownerId,
    );
    if (queryRepo.length === 0) {
      throw new HttpException(
        'Something went wrong, try again',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      res.send(queryRepo);
    }
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const repository = await this.repositoryService.getRepoById(id);
    if (repository) {
      res.send(repository);
    } else {
      throw new HttpException('Repository not found', HttpStatus.BAD_REQUEST);
    }
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
    if (contributions.length === 0) {
      throw new HttpException('Repository not found', HttpStatus.BAD_REQUEST);
    } else {
      res.send(contributions);
    }
  }
}

/* my custom api response solution */
/*
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
    */
