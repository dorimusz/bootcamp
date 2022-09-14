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
import { ContributionResponseDto } from '../contribution/dto/contribution-response.dto';
import { Cache } from 'cache-manager';
import {
  ApiParam,
  ApiResponse,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';
// import { ApiResponseService } from 'src/utils/apiResponse.service';
@Controller('/repository')
export class RepositoryController {
  constructor(
    private readonly repositoryService: RepositoryService,
    private readonly contributionService: ContributionService,
  ) {}
  // @Inject(CACHE_MANAGER) private cacheManager: Cache,
  // @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  // private readonly apiResponseService: ApiResponseService, // no need fot this - using HttpException instead

  // @UseInterceptors(CacheInterceptor)
  // @CacheTTL(30)
  // @CacheKey('repos')
  @Get('/')
  @ApiQuery({
    name: 'language',
    type: String,
    description: 'Search repositories by language.',
    example: 'Java',
    required: false,
  })
  @ApiQuery({
    name: 'stargazer_count',
    type: String,
    description: 'Search repositories by stargazer count.',
    example: '427',
    required: false,
  })
  @ApiQuery({
    name: 'ownerId',
    type: String,
    description: 'Search repositories by owner id.',
    example: '549085',
    required: false,
  })
  @ApiResponse({
    status: 404,
    description:
      'The requested repositories with optionally given query parameters do not exist.',
  })
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
    }
  }

  @Get('/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'An id of a existing repository',
    type: Number,
    example: 20235878,
  })
  @ApiOkResponse({
    description: 'The repositories has been successfully fetched',
  })
  @ApiResponse({
    status: 404,
    description: 'The repository with given id does not exist.',
  })
  async findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const repository = await this.repositoryService.getRepoById(id);
    if (repository) {
      res.send(repository);
    } else {
      throw new HttpException('Repository not found', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:id/contributions')
  @ApiParam({
    name: 'id',
    required: true,
    description:
      'An id of a existing repository to fetch related contributions',
    type: Number,
    example: 20235878,
  })
  @ApiOkResponse({
    description:
      "The repository's contributions have been successfully fetched",
  })
  @ApiResponse({
    status: 404,
    description: 'The contributions to the given repository are not found.',
  })
  async findContributions(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const contributions =
      await this.contributionService.getAllContributionsByRepoId(id);
    // console.log('@@contrib', contributions.length);
    if (contributions.length === 0) {
      throw new HttpException('Repository not found', HttpStatus.BAD_REQUEST);
    } else {
      const lessDataArray = [];
      contributions.forEach((contribution) => {
        const lessData = new ContributionResponseDto({
          userId: contribution.userId,
          commitCount: contribution.commitCount,
        });
        lessDataArray.push(lessData);
      });
      res.send(lessDataArray);
      // res.send(contributions);
    }
  }
}
