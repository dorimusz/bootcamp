import {
  Controller,
  Get,
  Req,
  Res,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ContributionService } from './contribution.service';
import { Request, Response } from 'express';
import { ContributionResponseDto } from './dto/contribution.dto';
@Controller('contribution')
export class ContributionController {
  constructor(private readonly contributionService: ContributionService) {}

  @Get()
  async getAllContributions(@Req() req: Request, @Res() res: Response) {
    const contributions = await this.contributionService.getAllContributions();
    if (contributions.length === 0) {
      throw new HttpException(
        "Something went wrong, couldn't find contributions, try again later.",
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const lessDataArray = [];
      contributions.forEach((contribution) => {
        const lessData = new ContributionResponseDto({
          userId: contribution.userId,
          commitCount: contribution.commitCount,
        });
        lessDataArray.push(lessData);
      });
      // res.send(lessDataArray);
      res.send(contributions);
    }
  }

  @Get('/repo/:id')
  async findOneRepoById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const contributions =
      await this.contributionService.getAllContributionsByRepoId(id);
    if (contributions.length === 0) {
      throw new HttpException(
        'No contributions found, try again.',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const lessDataArray = [];
      contributions.forEach((contribution) => {
        const lessData = new ContributionResponseDto({
          userId: contribution.userId,
          commitCount: contribution.commitCount,
        });
        lessDataArray.push(lessData);
      });
      res.send(lessDataArray);
    }
  }
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
