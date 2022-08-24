import { Injectable, Logger, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class AppService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger, // private readonly logger: LoggerConfig,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }
}
