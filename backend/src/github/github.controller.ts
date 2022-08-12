import { Controller, Get, Post } from '@nestjs/common';
import { GithubService } from './github.service';
@Controller('/sync')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get()
  getRepo(): Promise<any> {
    return this.githubService.getRepo();
  }

  @Post()
  create(): string {
    return ' create repo';
  }
}
