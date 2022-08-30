import { Injectable, Logger, NestMiddleware, Inject } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger, // private readonly logger: LoggerConfig,
  ) {}
  use(req: Request, res: Response, next: NextFunction) {
    // console.log('@@middleware', res.body);

    const filteredReqHeader = Object.entries(req.headers).filter(
      ([key, value]) => key !== 'cookie' && 'authorization',
    );
    const filteredResHeader = Object.entries(res.header).filter(
      ([key, value]) => key !== 'cookie' && 'authorization',
    );
    // console.log(filteredResHeader);
    // console.log(filteredReqHeader);

    let logLevel: string;
    if (res.statusCode < 399) logLevel = 'info';
    else if (res.statusCode >= 400 && res.statusCode <= 499) logLevel = 'warn';
    else if (res.statusCode >= 500) logLevel = 'error';

    this.logger.log(
      logLevel,
      `Incoming REQUEST: method: ${req.method}, original URL of the request ${
        req.originalUrl
      }, headers: ${JSON.stringify(
        filteredReqHeader,
      )} and body: ${JSON.stringify(req.body)}, sent RESPONSE: status code: ${
        res.statusCode
      }, headers: ${JSON.stringify(filteredResHeader)}`,
    );
    next();
  }
}
