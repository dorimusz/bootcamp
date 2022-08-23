import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository as RepositoryEntity } from '../entity/repository.entity';
import { User as UserEntity } from '../entity/user.entity';
import { Contribution as ContributionEntity } from '../entity/contribution.entity';

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

  private config = {
    headers: { Authorization: `Token ${process.env.GITHUB_TOKEN}` },
  };

  async fetchRepo(): Promise<any> {
    try {
      return await this.httpService.axiosRef.get(
        'https://api.github.com/users/instagram/repos?page=1&per_page=2',
        // 'https://api.github.com/users/instagram/repos',
        this.config,
      );
      //   console.log(response.data[0].commit);
    } catch (error) {
      console.log(error);
    }
  }

  async fetchContributors(data): Promise<any> {
    return await Promise.all(
      data.map((repository) => {
        return this.httpService.axiosRef.get(
          repository.contributors_url,
          this.config,
        );
      }),
    );
  }

  buildUser(data: any): UserEntity[] {
    return data.map((repo) => {
      return <UserEntity>{
        id: repo.id,
        login: repo.login,
        avatar_url: repo.avatar_url,
        html_url: repo.html_url,
        type: repo.type,
      };
    });
  }

  buildOwner(data: any): UserEntity[] {
    return data.map((repo) => {
      return <UserEntity>{
        id: repo.owner.id,
        login: repo.owner.login,
        avatar_url: repo.owner.avatar_url,
        html_url: repo.owner.html_url,
        type: repo.owner.type,
      };
    });
  }

  buildRepository(data: any): RepositoryEntity {
    return data.map((repository) => {
      //   console.log('@@OWNER', repository.owner);
      return <RepositoryEntity>{
        id: repository.id,
        owner: repository.owner.id,
        full_name: repository.full_name,
        description: repository.description,
        html_url: repository.html_url,
        language: repository.language,
        stargazer_count: repository.stargazers_count,
      };
    });
  }

  buildContribution(repositories: any, contributors: any): ContributionEntity {
    return repositories.map((repository) => {
      //   console.log('@@@REPOSITORY', repository);
      return contributors.map((contributor) => {
        // console.log('@@@CONTRIBUTOR', contributor.id);
        return <ContributionEntity>{
          userId: contributor.id,
          repository: repository.id,
          // commitCount: contributor.contributions,
        };
      });
    });
  }

  removeDuplicates(userArray: any): any {
    return userArray.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.id === value.id),
    );
  }

  async syncDatabase(): Promise<any> {
    const response = await this.fetchRepo();
    const contributions = await this.fetchContributors(response.data); //array
    // console.log('@@@', contributions);

    const contributors = [];
    contributions.forEach((contribution) => {
      contributors.push(...contribution.data);
    });

    const usersContsArray = this.buildUser(contributors); //contributors only
    // const usersConts = this.removeDuplicates(usersContsArray); //no need for this
    const ownersArray = this.buildOwner(response.data); //all owners, contains duplicates
    const owners = this.removeDuplicates(ownersArray);
    const users = [...usersContsArray, ...owners];
    const repositories = this.buildRepository(response.data);
    const contributs = this.buildContribution(response.data, usersContsArray);

    // console.log('@@CONTRIBUTS', contributs);
    // console.log([...usersConts, ...owners]);
    // console.log('@@repo', repositories);
    console.log('@@', users);

    await this.userRepository.save(users);
    await this.repositoryRepository.save(repositories);
    await this.contributionRepository.save(contributs);
    console.log('Database is synced successfully');
  }
}

//TRANSACTIONS!!!! https://www.darraghoriordan.com/2022/06/13/persistence-6-typeorm-postgres-transactions/
//TRANSACTIONS!!!! https://orkhan.gitbook.io/typeorm/docs/transactions
// await this.userRepository.save(owner);
// await this.repositoryRepository.save(repos);
