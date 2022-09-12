export class ContributionResponseDto {
  userId: number;

  commitCount: number;

  constructor(partial: Partial<ContributionResponseDto>) {
    Object.assign(this, partial);
  }
}
