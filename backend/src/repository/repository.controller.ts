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
  CACHE_MANAGER,
  Inject,
  CacheTTL,
  CacheKey,
} from '@nestjs/common';
// import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
// import { Logger } from 'winston';
import { Request, Response } from 'express';
import { RepositoryService } from './repository.service';
import { ContributionService } from 'src/contribution/contribution.service';
import { Repository as RepositoryEntity } from './repository.entity';
import { RepositoryResponseDto } from './dto/repository-response.dto';
import { Cache } from 'cache-manager';
// import { ApiResponseService } from 'src/utils/apiResponse.service';
@Controller('/repository')
export class RepositoryController {
  constructor(
    private readonly repositoryService: RepositoryService,
    private readonly contributionService: ContributionService,
  ) {}
  // @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  // private readonly apiResponseService: ApiResponseService, // no need fot this - using HttpException instead
  // @Inject(CACHE_MANAGER) private cacheManager: Cache,

  // @UseInterceptors(CacheInterceptor)
  // @CacheTTL(30)
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
      // const lessDataArray = [];
      // queryRepo.forEach((repository) => {
      //   const lessData = new RepositoryResponseDto({
      //     full_name: repository.full_name,
      //     ownerId: repository.ownerId,
      //     description: repository.description,
      //     language: repository.language,
      //     stargazer_count: repository.stargazer_count,
      //     contributionSum: repository.contributionSum, //want to use the repo entity
      //     contributions: repository.contributions,
      //   });
      //   lessDataArray.push(lessData);
      // });
      // res.send(lessDataArray); //the queried data not using the dto schema

      res.send(queryRepo);

      // await this.cacheManager.set('repos', queryRepo);
      // console.log('@@redis', await this.cacheManager.get('repos'));
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
