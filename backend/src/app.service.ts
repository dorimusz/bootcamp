import { Injectable, Logger, Inject, CACHE_MANAGER } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger, // private readonly logger: LoggerConfig,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  //cache manager needs it async, also had to remove type:string
  async getHello() {
    await this.cacheManager.set('cached_item', { key: 32 }, { ttl: 10 });
    await this.cacheManager.del('cached_item');
    await this.cacheManager.reset(); //deletes everything from cache
    const cachedItem = await this.cacheManager.get('cached_item');
    console.log(cachedItem);
    return 'Hello World!';
  }
}
