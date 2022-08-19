import { Injectable, HttpException } from '@nestjs/common';
import http, { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// import { RepositoryDto } from '../repository/dto/repository.dto'; //service needs interfaces

import { Repository as RepositoryEntity } from '../entity/repository.entity';
import { User as UserEntity } from '../entity/user.entity';
import { Contribution as ContributionEntity } from '../entity/contribution.entity';
// import { stringify, parse, toJSON, fromJSON } from 'flatted';

const headers = {
  Authorization: `Token ${process.env.GITHUB_TOKEN}`,
};
@Injectable()
export class GithubService {
  // constructor a dependencyknek (modulok, classok stb) -  pl userrepository, hasznalhato lest pl insert fuggveny
  constructor(
    private readonly httpService: HttpService,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RepositoryEntity)
    private readonly repositoryRepository: Repository<RepositoryEntity>,
    @InjectRepository(ContributionEntity)
    private readonly contributionRepository: Repository<ContributionEntity>,
  ) {}

  async populateDatabase(): Promise<any> {
    const getCommits = (commits) => {
      commits.map((commit) =>
        commit.data.forEach((oneCommit) => {
          //   console.log('@@ihh', oneCommit.author);
          if (oneCommit.author?.id != null) {
            console.log(oneCommit.author.id);
            return oneCommit.author;
            // return <UserEntity>{
            //   id: oneCommit.author.id,
            //   login: oneCommit.author.login,
            //   avatar_url: oneCommit.author.avatar_url,
            //   html_url: oneCommit.author.html_url,
            //   type: oneCommit.author.type,
            // };
          } else {
            // console.log('no author');
          }
        }),
      );
    };

    //   GET request to Github API to get all repositories and users
    let response;
    try {
      response = await this.httpService.axiosRef.get(
        'https://api.github.com/users/instagram/repos?page=1&per_page=3',
        {
          headers: headers,
        },
      );
      //   console.log(response.data[0].commit);
    } catch (error) {
      console.log(error);
    }

    //   GET request to Github API to get commits and related users (committers)for each repository
    const commits = await Promise.all(
      response.data.map((repo) => {
        const url = repo.commits_url;
        const commitUrl = url.replace('{/sha}', '');
        // console.log(commitUrl);
        const res = this.httpService.axiosRef.get(commitUrl, {
          headers: headers,
        });
        // console.log('first', res); //pending promise
        return res;
      }),
    ).then((res) => console.log('AAA', getCommits(res)));

    console.log('@@commits ', commits);

    const owner: Array<UserEntity> = response.data.map((repo) => {
      return <UserEntity>{
        id: repo.owner.id,
        login: repo.owner.login,
        avatar_url: repo.owner.avatar_url,
        html_url: repo.owner.html_url,
        type: repo.owner.type,
      };
    });
    console.log('@@owner', owner);

    const repos: Array<RepositoryEntity> = response.data.map((repo) => {
      return <RepositoryEntity>{
        id: repo.id,
        owner: repo.owner.id,
        full_name: repo.full_name,
        description: repo.description,
        html_url: repo.html_url,
        language: repo.language,
        stargazer_count: repo.stargazers_count,
      };
    });

    // const contributions: Array<ContributionEntity> = commits.map((commit) => {

    // console.log('repos' + repos);

    // console.log(response.data[0].owner);
    // console.log(typeof response.data[0].commits_url);

    //TRANSACTIONS!!!! https://www.darraghoriordan.com/2022/06/13/persistence-6-typeorm-postgres-transactions/
    // await this.userRepository.save(owner);
    // await this.repositoryRepository.save(repos);
  }
}

/*
    let repositories;
try {
    const { data, status } = await http.get<GithubRepoResponse>(
    'https://api.github.com/users/instagram/repos',
    {
        headers: headers,
    },
    );
    console.log('response status is: ', status);
    //   console.log(JSON.stringify(data, null, 2));
    repositories = data;
    //   return repositories;
} catch (error) {
    if (http.isAxiosError(error)) {
    // console.log('error message: ', error.message);
    return error.message;
    } else {
    console.log('unexpected GET req error: ', error);
    return 'An unexpected error occurred';
    }
}
*/

/*
        const repositories = await this.httpService
      .get('https://api.github.com/users/instagram/repos?page=1&per_page=3')
      .toPromise()
      .catch((err) => {
        throw new HttpException(err.response.data, err.response.status);
      });
    console.log(repositories.data);
*/
