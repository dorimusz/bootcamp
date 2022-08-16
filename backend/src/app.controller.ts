import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() //also accepts a string as a path
  getHello(): string {
    return this.appService.getHello();
  }
}
