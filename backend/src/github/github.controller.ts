import { Controller, Get, Post } from '@nestjs/common';
import http from 'axios';

type GithubRepo = {
  id: number;
  owner: string;
  full_name: string;
  description: string;
  html_url: string;
  language: string;
  stargazer_count: number;
};

type GithubRepoResponse = {
  data: GithubRepo[];
};

// async function getRepos() {
//   const { data, status } = await http.get<GithubRepoResponse>(
//     'https://api.github.com/users/instagram/repos?page=1&per_page=15',
//   );
// }

@Controller('/sync')
export class GithubController {
  @Get()
  findAll(): string {
    return 'data from github';
  }

  @Post()
  create(): string {
    return ' create repo';
  }
}
