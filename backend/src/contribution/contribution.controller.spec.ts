import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ContributionController } from './contribution.controller';
import { ContributionService } from './contribution.service';
import { Contribution } from './contribution.entity';
import { contributionMock } from './mock/contribution.mock';
import { contributionResMock } from './mock/contributionRes.mock';

describe('ContributionController', () => {
  let controller: ContributionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContributionController],
      providers: [
        ContributionService,
        {
          provide: getRepositoryToken(Contribution),
          useValue: {
            find: jest.fn().mockRejectedValue(contributionMock),
          },
        },
      ],
    }).compile();

    controller = module.get<ContributionController>(ContributionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return array of all contributions', async () => {
    const contributions = await controller.getAllContributions();

    expect(contributions).toEqual(contributions);
  });
});
