import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Repository as RepositoryEntity } from '../entity/repository.entity';

@Injectable()
export class RepositoryService {
  constructor(
    @InjectRepository(RepositoryEntity)
    private readonly repositoryRepository: Repository<RepositoryEntity>,
  ) {}

  async getAllRepos(): Promise<RepositoryEntity[]> {
    return await this.repositoryRepository.find();
  }

  async getRepoById(id: number): Promise<RepositoryEntity> {
    console.log('@@ID', id);
    return await this.repositoryRepository.findOne({
      where: { id },
    }); // w type number it has a problem
  }
}
