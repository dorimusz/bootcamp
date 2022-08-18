import { Injectable } from '@nestjs/common';
// import http from 'axios';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// import { RepositoryDto } from '../repository/dto/repository.dto'; //service needs interfaces

import { Repository as RepositoryEntity } from '../entity/repository.entity';
import { User as UserEntity } from '../entity/user.entity';
import { Contribution as ContributionEntity } from '../entity/contribution.entity';
import { stringify } from 'flatted';

// type GithubRepoResponse = {
//   data: RepositoryDto[];
// };

const headers = {
  Authorization: `Token ${process.env.GITHUB_TOKEN}`,
};
@Injectable()
export class GithubService {
  // constructor a dependencyknek (modulok, classok stb) -  pl userrepository, hasznalhato lest pl insert fuggveny
  constructor(
    private readonly httpService: HttpService,

    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
    @InjectRepository(RepositoryEntity)
    private readonly repositoryEntity: Repository<RepositoryEntity>,
    @InjectRepository(ContributionEntity)
    private readonly contributionEntity: Repository<ContributionEntity>,
  ) {}

  async getData(): Promise<any> {
    // GET request to Github API to get all repositories
    let repositoriesRes;
    try {
      repositoriesRes = await this.httpService.axiosRef.get(
        'https://api.github.com/users/instagram/repos?page=1&per_page=15',
        {
          headers: headers,
        },
      );
      stringify(repositoriesRes);
    } catch (error) {
      console.log('error GETting repo data from github', error);
      return error; //should stay return? or throw error? or something else?
    }
    console.log(repositoriesRes);
  }
}

//wrapper class

/*
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
      repositories = data;
      return repositories;
    } catch (error) {
      if (http.isAxiosError(error)) {
        // console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected GET req error: ', error);
        return 'An unexpected error occurred';
      }

*/
