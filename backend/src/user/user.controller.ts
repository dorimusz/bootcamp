import { Controller, Get, Req, Res, Param, ParseIntPipe } from '@nestjs/common';
import { ApiResponseService } from 'src/utils/apiResponse.service';
import { UserService } from '../user/user.service';
import { Request, Response } from 'express';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly apiResponseService: ApiResponseService,
  ) {}

  @Get()
  async getAllUsers(@Req() req: Request, @Res() res: Response) {
    const users = await this.userService.getAllUsers();
    this.apiResponseService.customApiResponse(
      res,
      users,
      'Users cannot be found.',
      'Error getting users.',
    );
  }

  @Get('/:id')
  async findOneUserById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const user = await this.userService.getUserById(id);
    this.apiResponseService.customApiResponse(
      res,
      user,
      'User not found.',
      'Error getting user.',
    );
  }
}
