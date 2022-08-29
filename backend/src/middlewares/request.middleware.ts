import { Injectable, Logger, NestMiddleware, Inject } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class requestMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger, // private readonly logger: LoggerConfig,
  ) {}
  use(req: Request, res: Response, next: NextFunction) {
    console.log('@@middleware', req);
    // const { method, originalUrl, headers, body } = req;

    // this.logger.log(
    //   'info',
    //   `REQUEST: method: ${req.method}, original url of the request: ${req.originalUrl}`,
    // );
    next();
  }
}
