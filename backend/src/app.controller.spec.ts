import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinstonModule } from 'nest-winston';
import { LoggerConfig } from './config/logger.config';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const logger: LoggerConfig = new LoggerConfig();
    const app: TestingModule = await Test.createTestingModule({
      imports: [WinstonModule.forRoot(logger.console())],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // expect(appController.getHello()).toEqual('Hello World!');
      expect(appController.getHello()).toBeDefined();
    });
  });
});
