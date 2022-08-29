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

  async findContributions(id: number): Promise<ContributionEntity[]> {
    return await this.contributionRepository.find({
      where: { repositoryId: id },
    });
  }

  async searchRepositories(query: { language: string }) {
    console.log('@@service', query.language);
    return await this.repositoryRepository.find({
      where: { language: query.language },
    });
  }
}
