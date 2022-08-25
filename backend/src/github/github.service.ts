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
        'https://api.github.com/users/instagram/repos?page=1&per_page=10',
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
        userId: repo.id,
        login: repo.login,
        avatar_url: repo.avatar_url,
        html_url: repo.html_url,
        type: repo.type,
      };
    });
  }

  buildContributors(data: any): ContributionEntity[] {
    return data.map((contributor) => {
      return <ContributionEntity>{
        userId: contributor.userId,
        repositoryId: contributor.repositoryId,
        commitCount: contributor.commitCount,
      };
    });
  }

  buildOwner(data: any): UserEntity[] {
    return data.map((repo) => {
      return <UserEntity>{
        userId: repo.owner.id,
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
        ownerId: repository.owner.id,
        full_name: repository.full_name,
        description: repository.description,
        html_url: repository.html_url,
        language: repository.language,
        stargazer_count: repository.stargazers_count,
      };
    });
  }

  removeDuplicates(userArray: any): any {
    return userArray.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.userId === value.userId),
    );
  }

  async getContributorData(response) {
    return await Promise.all(
      response.data.map(async (repos, index) => {
        const contributions = await this.httpService.axiosRef.get(
          response.data[index].contributors_url,
          this.config,
        );

        return contributions.data.map((contributor) => {
          return {
            repositoryId: repos.id,
            userId: contributor.id,
            commitCount: contributor.contributions,
          };
        });
      }),
    );
  }

  async syncDatabase(): Promise<any> {
    const response = await this.fetchRepo();
    const contributions = await this.fetchContributors(response.data); //array
    // console.log('@@@', contributions);

    //contriubutors and repos for contributor table
    const contributes = await this.getContributorData(response);

    const contributors = [];
    contributions.forEach((contribution) => {
      contributors.push(...contribution.data);
    });

    const usersContsArray = this.buildUser(contributors); //contributors only
    const ownersArray = this.buildOwner(response.data); //all owners, contains duplicates
    const owners = this.removeDuplicates(ownersArray);
    const contributionTableData = this.buildContributors(contributes.flat());
    const users = [...usersContsArray, ...owners];
    const usersNotDuplicated = this.removeDuplicates(users);
    const repositories = this.buildRepository(response.data);

    // console.log([...usersConts, ...owners]);
    // console.log('@@onwers', owners);
    // console.log('@@originalOWENERS', ownersArray);
    // console.log('@@usersConts', usersContsArray);
    // console.log('@@DUPLICATES REMOVED', usersNotDuplicated);
    // console.log('@@repo', repositories);
    // console.log('@@CONTR', contributionTableData);

    await this.userRepository.save(usersNotDuplicated);
    await this.repositoryRepository.save(repositories);
    await this.contributionRepository.save(contributionTableData);
    console.log('Database is synced successfully');
  }
}

//TRANSACTIONS!!!! https://www.darraghoriordan.com/2022/06/13/persistence-6-typeorm-postgres-transactions/
//TRANSACTIONS!!!! https://orkhan.gitbook.io/typeorm/docs/transactions
// await this.userRepository.save(owner);
// await this.repositoryRepository.save(repos);
