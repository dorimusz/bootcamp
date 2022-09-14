import { Controller, Get } from '@nestjs/common';
import { GithubService } from './github.service';
import { ApiResponse, ApiOkResponse } from '@nestjs/swagger';
@Controller('/sync')
export class GithubController {
  //readonly - set in constructor, cannot be changed or at least no need to modify later on
  //private - only accessible in this class
  constructor(private readonly githubService: GithubService) {}

  @Get()
  @ApiOkResponse({
    description:
      'Populates and/or synchronizes database with data coming from an external API (GitHub).',
  })
  @ApiResponse({
    status: 400,
    description: 'Something went wrong, synchronization failed.',
  })
  populateDatabase(): Promise<any> {
    return this.githubService.syncDatabase();
  }
}
