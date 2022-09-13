export class RepositoryResponseDto {
  full_name: string;
  ownerId: number;
  description: string;
  language: string;
  stargazer_count: number;
  contributions: Contributors[];
  contributionSum: number;

  constructor(partial: Partial<RepositoryResponseDto>) {
    Object.assign(this, partial);
  }
}

type Contributors = {
  userId: number;
  repositoryId: number;
  commitCount: number;
};
