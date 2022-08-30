import { CACHE_MANAGER } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppService } from './app.service';
import { WinstonModule } from 'nest-winston';
import { LoggerConfig } from './config/logger.config';

const mockCacheManager = {
  set: jest.fn(),
  get: jest.fn(),
  del: jest.fn(),
  reset: jest.fn(),
};

describe('AppService', () => {
  let appService: AppService;
  const logger: LoggerConfig = new LoggerConfig();
  beforeEach(async () => {
    const modulRef = await Test.createTestingModule({
      imports: [WinstonModule.forRoot(logger.console())],
      controllers: [],
      providers: [
        AppService,
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager,
        },
      ],
    }).compile();

    appService = modulRef.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(appService).toBeDefined();
  });
});
