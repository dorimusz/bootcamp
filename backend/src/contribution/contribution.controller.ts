import { Controller, Get, Req, Res, Param, ParseIntPipe } from '@nestjs/common';
import { ContributionService } from './contribution.service';
import { ApiResponseService } from '../utils/apiResponse.service';
import { Request, Response } from 'express';
@Controller('contribution')
export class ContributionController {
  constructor(
    private readonly contributionService: ContributionService,
    private readonly apiResponseService: ApiResponseService,
  ) {}

  @Get()
  async getAllContributions(@Req() req: Request, @Res() res: Response) {
    const contributions = await this.contributionService.getAllContributions();
    this.apiResponseService.customApiResponse(
      res,
      contributions,
      'Contributions cannot be found.',
      'Error getting contributions.',
    );
  }

  @Get('/repo/:id')
  async findOneRepoById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const user = await this.contributionService.getAllContributionsByRepoId(id);
    this.apiResponseService.customApiResponseForArrays(
      res,
      user,
      'The requested contributions or the repository might not exist.',
      'Error getting contributions.',
    );
  }

  //   @Get('/user/:id')
  //   async getAllContributionsByUserId(
  //     @Param('id', ParseIntPipe) id: number,
  //     @Res() res: Response,
  //   ) {
  //     const user = await this.contributionService.getAllContributionsByUserId(id);
  //     this.apiResponseService.customApiResponseForArrays(
  //       res,
  //       user,
  //       'The requested contributions or the repository might not exist.',
  //       'Error getting contributions.',
  //     );
  //   }
}
