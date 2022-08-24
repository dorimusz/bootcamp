import { LoggerConfig } from './config/logger.config';
import { Controller, Get, Logger, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger, // private readonly logger: LoggerConfig,
  ) {}

  @Get() //also accepts a string as a path
  getHello(): string {
    this.logger.error('asd');
    console.debug('debug');
    return this.appService.getHello();
  }
}
