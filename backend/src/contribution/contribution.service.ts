import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contribution as ContributionEntity } from './contribution.entity';

@Injectable()
export class ContributionService {
  constructor(
    @InjectRepository(ContributionEntity)
    private readonly contributionRepository: Repository<ContributionEntity>,
  ) {}

  //contributions of all repos
  async getAllContributions(): Promise<ContributionEntity[]> {
    return await this.contributionRepository.find();
  }

  //all contributions connected to one repo
  async getAllContributionsByRepoId(id: number): Promise<ContributionEntity[]> {
    return await this.contributionRepository.find({
      where: { repositoryId: id },
      relations: ['repository', 'user'],
    });
  }

  // async getAllContributionsByUserId(id: number): Promise<ContributionEntity[]> {
  //   console.log('@@userid', id);
  //   return await this.contributionRepository.find({
  //     where: { userId: id },
  //   });
  // }
}
