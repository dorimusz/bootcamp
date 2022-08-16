import { Injectable } from '@nestjs/common';
import http from 'axios';
import { RepositoryDto } from '../repository/dto/repository.dto'; //service needs interfaces

type GithubRepoResponse = {
  data: RepositoryDto[];
};

const headers = {
  Authorization: `Token ${process.env.GITHUB_TOKEN}`,
};
@Injectable()
export class GithubService {
  async getData(): Promise<any> {
    try {
      const { data, status } = await http.get<GithubRepoResponse>(
        'https://api.github.com/users/instagram/repos?page=1&per_page=15',
        {
          headers: headers,
        },
      );
      console.log(typeof data);
      //   console.log('response status is: ', status);
      //   console.log(JSON.stringify(data, null, 2));
      return data;
    } catch (error) {
      if (http.isAxiosError(error)) {
        // console.log('error message: ', error.message);
        return error.message;
      } else {
        // console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  }
}
//wrapper class
