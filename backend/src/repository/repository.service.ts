import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Repository as RepositoryEntity } from '../entity/repository.entity';
import { Contribution as ContributionEntity } from 'src/entity/contribution.entity';

@Injectable()
export class RepositoryService {
  constructor(
    @InjectRepository(RepositoryEntity)
    private readonly repositoryRepository: Repository<RepositoryEntity>,
    @InjectRepository(ContributionEntity)
    private readonly contributionRepository: Repository<ContributionEntity>,
  ) {}

  async getAllRepos(): Promise<RepositoryEntity[]> {
    return await this.repositoryRepository.find();
  }

  async getRepoById(id: number): Promise<RepositoryEntity> {
    console.log('@@ID', id);
    // return await this.repositoryRepository.findOneOrFail({ //throws an error
    return await this.repositoryRepository.findOne({
      //doesn't throw an error, gives null
      where: { id },
    }); // w type number it has a problem
  }

  //get contributors list, gives back repofull name with da twist

  // async getContributors(id: number) {}

  /* 
  async findContributions(id: number): Promise<ContributionEntity[]> {
    return await this.contributionRepository.find({
      where: { repositoryId: id },
    });
  }
  */
  async searchRepositories(query: {
    language: string;
    stargazer_count: number;
    ownerId: number;
  }) {
    // console.log('@@query', query);
    // console.log('@@querylang', query.stargazer_count);
    if (query.language) {
      return await this.repositoryRepository.find({
        where: { language: query.language },
      });
    }
    if (query.stargazer_count) {
      return await this.repositoryRepository.find({
        where: { stargazer_count: query.stargazer_count },
      });
    }
    if (query.ownerId) {
      return await this.repositoryRepository.find({
        where: { ownerId: query.ownerId },
      });
    }
    // if (
    //   (query.language && query.stargazer_count) ||
    //   (query.language && query.ownerId) ||
    //   (query.stargazer_count && query.ownerId) ||
    //   (query.language && query.stargazer_count && query.ownerId)
    // ) {
    //   return await this.repositoryRepository.find({
    //     where: {
    //       language: query.language,
    //       stargazer_count: query.stargazer_count,
    //       ownerId: query.ownerId,
    //     },
    //   });
    // }
  }
}

/*
async searchRepositories(query: {
    language?: string;
    stargazer_count?: number;
    ownerId?: number;
    description?: string;
  }) {
    console.log('@@service', query.language);
    if (query.language && query.stargazer_count && query.ownerId) {
      return await this.repositoryRepository.find({
        where: {
          language: query.language,
          stargazer_count: query.stargazer_count,
          ownerId: query.ownerId,
        },
      });
    }
    if (query.language) {
      return await this.repositoryRepository.find({
        where: { language: query.language },
      });
    }
    if (query.stargazer_count) {
      return await this.repositoryRepository.find({
        where: { stargazer_count: query.stargazer_count },
      });
    }
    if (query.ownerId) {
      return await this.repositoryRepository.find({
        where: { ownerId: query.ownerId },
      });
    }
  }
*/
