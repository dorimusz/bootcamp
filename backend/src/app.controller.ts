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
    // this.logger.error('error in app controller');
    // this.logger.log('error', 'error message');
    // this.logger.log('warn', 'warn message');
    // this.logger.log('info', 'info message');

    this.logger.error(new Error('error message about something went wrong'));
    this.logger.log('info', 'info message');

    return this.appService.getHello();
  }
}
