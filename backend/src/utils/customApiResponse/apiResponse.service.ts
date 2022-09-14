import { Injectable, Inject, Req, Res, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { RequestMiddleware } from '../../middlewares/request.middleware';
@Injectable()
export class ApiResponseService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly filterResponse: RequestMiddleware, // private readonly logger: LoggerConfig,
  ) {}

  // filterResHeader = (header) => {
  //   return Object.entries(header).filter(
  //     ([key, value]) => key !== 'cookie' && 'authorization',
  //   );
  // };

  customApiResponse(@Res() res: Response, data, notFoundMsg, elseMsg) {
    // const fileteredResHeader = this.filterResHeader(res.header);
    // const message = this.logger.log(
    //   'info',
    //   `custom api RESPONSE: status code: ${
    //     res.statusCode
    //   }, headers: ${JSON.stringify(fileteredResHeader)}`,
    // );

    if (data) {
      res.status(200).send(data);
      // this.logger.log('info', message);
    } else if (data === null) {
      // console.log(data);
      res.status(404).send({
        msg: notFoundMsg,
      });
      // this.logger.log('warn', message);
    } else {
      res.status(500).send({
        msg: elseMsg,
      });
      // this.logger.log('error', message);
    }
  }

  customApiResponseForArrays(@Res() res: Response, data, notFoundMsg, elseMsg) {
    const secondChecker = data.length > 0 || data === null ? true : false; //checks if data is an empty array
    if (secondChecker) {
      res.status(200).send(data);
    } else if (data === null || !secondChecker) {
      // console.log(data);
      res.status(404).send({
        msg: notFoundMsg,
      });
    } else {
      res.status(500).send({
        msg: elseMsg,
      });
    }
  }
}

/* custom api response solution used in a controller*/
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
