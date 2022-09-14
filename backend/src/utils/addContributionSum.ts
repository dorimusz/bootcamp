import { RepositoryWithContributionCount } from '../repository/dto/repository.dto';

const addContributionSum = (result) => {
  result.map((repos: RepositoryWithContributionCount) => {
    const contributionList = repos.contributions; //repository objects with
    //loadRelationCountAndMap(repository.contributions)

    // console.log('@@REPOLIST', repos);
    // console.log('@@CONTRIBUTIONLIST', repos.contributionList);
    const sum = contributionList
      .map((contribution) => contribution.commitCount)
      .reduce((prev, next) => prev + next);

    repos.contributionSum = sum;
    // console.log('@@sum', sum);
  });
};

export default addContributionSum;
