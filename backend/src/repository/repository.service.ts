import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Repository as RepositoryEntity } from '../entity/repository.entity';
import {
  Contribution,
  Contribution as ContributionEntity,
} from 'src/entity/contribution.entity';
import { ContributionService } from 'src/contribution/contribution.service';

@Injectable()
export class RepositoryService {
  constructor(
    @InjectRepository(RepositoryEntity)
    private readonly repositoryRepository: Repository<RepositoryEntity>,
    private readonly contributionService: ContributionService,
  ) {}

  //searchRepositories() uses it
  async getAllRepos(): Promise<RepositoryEntity[]> {
    const result = await this.repositoryRepository.find();
    // console.log('@@ddddd', result);
    return result;
  }
  async getRepoById(id: number): Promise<RepositoryEntity> {
    console.log('@@ID', id);
    const result = await this.repositoryRepository.findOne({
      //doesn't throw an error, gives null
      where: { id },
    }); // w type number it has a problem
    // return await this.repositoryRepository.findOneOrFail({ //throws an error
    return result;
  }

  /* 
  async findContributions(id: number): Promise<ContributionEntity[]> {
    return await this.contributionRepository.find({
      where: { repositoryId: id },
    });
  }
  */

  // async getContributors(full_name: string): Promise<ContributionEntity[]> {

  // }

  async searchRepositories(
    language: string,
    stargazer_count: number,
    ownerId: number,
  ) {
    if (language || stargazer_count || ownerId) {
      return await this.repositoryRepository.find({
        where: [
          {
            language: language,
            stargazer_count: stargazer_count,
            ownerId: ownerId,
          },
        ],
      });
    }
    return await this.getAllRepos();

    //return await this.repositoryRepository.find({
    //   where: [
    //     { language: query.language },
    //     { stargazer_count: query.stargazer_count },
    //     { ownerId: query.ownerId },
    //   ],
    // });
    // SELECT * FROM repository WHERE language = 'en' OR ownerId = 1 OR stargazer_count=1;

    // return await this.repositoryRepository.find({
    //   where: { language: 'en', ownerId: 1 },
    // });
    // SELECT * FROM repository WHERE language = 'en' AND ownerId = 1;
  }
}
