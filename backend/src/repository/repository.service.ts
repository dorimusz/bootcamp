import { Inject, Injectable, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Repository as RepositoryEntity } from './repository.entity';
import addContributionSum from '../utils/addContributionSum';
import { ContributionService } from 'src/contribution/contribution.service';

@Injectable()
export class RepositoryService {
  constructor(
    @InjectRepository(RepositoryEntity)
    private readonly repositoryRepository: Repository<RepositoryEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  // private readonly contributionService: ContributionService,

  //searchRepositories() uses it
  async getAllRepos(): Promise<RepositoryEntity[]> {
    const result = await this.repositoryRepository.find({
      relations: ['owner', 'contributions'],
    });

    addContributionSum(result);
    // console.log('@@COUNT', contributionSum); //sum of commitcounts in an array
    // console.log('@@REPORESULT', result[0].contributions);
    // console.log('@@REPORESULT', result);

    await this.cacheManager.set('repos', result);
    console.log('@@redis', await this.cacheManager.get('repos'));
    return result;
  }

  async getRepoById(id: number): Promise<RepositoryEntity> {
    // console.log('@@ID', id);
    const result = await this.repositoryRepository.findOne({
      //doesn't throw an error, gives null
      where: { id },
      // relations: ['contributions', 'owner'],
    });
    // return await this.repositoryRepository.findOneOrFail({ //throws an error
    return result;
  }

  //getContributions()

  async searchRepositories(
    language: string,
    stargazer_count: number,
    ownerId: number,
  ) {
    if (language || stargazer_count || ownerId) {
      const result = await this.repositoryRepository.find({
        where: [
          {
            language: language,
            stargazer_count: stargazer_count,
            ownerId: ownerId,
          },
        ],
        relations: ['owner', 'contributions'],
      });
      addContributionSum(result);
      console.log('@@IAO', result);
      await this.cacheManager.set('queryRepos', result);
      return result;
    }
    return await this.getAllRepos();
  }
}

/*
// searchRepositories()
return await this.repositoryRepository.find({
  where: [
    { language: query.language },
    { stargazer_count: query.stargazer_count },
    { ownerId: query.ownerId },
  ],
});
SELECT * FROM repository WHERE language = 'en' OR ownerId = 1 OR stargazer_count=1;

return await this.repositoryRepository.find({
  where: { language: 'en', ownerId: 1 },
});
SELECT * FROM repository WHERE language = 'en' AND ownerId = 1;
*/
