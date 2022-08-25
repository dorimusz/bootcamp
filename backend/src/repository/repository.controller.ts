import { Controller, Get, Param, Req, Res, ParseIntPipe } from '@nestjs/common';
// import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
// import { Logger } from 'winston';
import { ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { RepositoryService } from './repository.service';
import { Repository as RepositoryEntity } from '../entity/repository.entity';
@Controller('/repository')
export class RepositoryController {
  constructor(
    private readonly repositoryService: RepositoryService, // @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  customApiResponse(@Res() res: Response, data, notFoundMsg, elseMsg) {
    if (data) {
      res.status(200).send(data);
    } else if (data === null) {
      res.status(404).send({
        msg: notFoundMsg,
      });
    } else {
      res.status(500).send({
        msg: elseMsg,
      });
    }
  }

  @Get()
  async getRepositories(@Req() req: Request, @Res() res: Response) {
    const repositories = await this.repositoryService.getAllRepos();
    this.customApiResponse(
      res,
      repositories,
      'No repositories found.',
      'Error getting repositories.',
    );
  }

  @Get('/:id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    // @Req() req: Request,
    @Res() res: Response,
  ) {
    const repository = await this.repositoryService.getRepoById(id);
    this.customApiResponse(
      res,
      repository,
      'Repository not found.',
      'Error getting repository.',
    );
  }
}
