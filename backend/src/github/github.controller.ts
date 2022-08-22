import { Controller, Get } from '@nestjs/common';
import { GithubService } from './github.service';
@Controller('/sync')
export class GithubController {
  //readonly - set in constructor, cannot be changed or at least no need to modify later on
  //private - only accessible in this class
  constructor(private readonly githubService: GithubService) {}

  @Get()
  populateDatabase(): Promise<any> {
    return this.githubService.syncDatabase();
  }
}
