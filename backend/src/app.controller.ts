import {
  Controller,
  Get,
  Logger,
  Inject,
  UseInterceptors,
  CacheInterceptor,
  CacheKey,
  CacheTTL,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { AppService } from './app.service';

// @UseInterceptors(CacheInterceptor) // can use caching a specific route, but rn want to use it everywhere
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger, // private readonly logger: LoggerConfig,
  ) {}

  @Get() //also accepts a string as a path
  // @CacheKey('some_route') //custom cache
  // @CacheTTL(60) //custom ttl
  //got rid of type and made it async bc caching
  async getHello() {
    return this.appService.getHello();
  }
}
