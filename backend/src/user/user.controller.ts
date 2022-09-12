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
import { UserService } from '../user/user.service';
import { Request, Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(@Req() req: Request, @Res() res: Response) {
    const users = await this.userService.getAllUsers();
    if (users) {
      res.send(users);
    } else {
      throw new HttpException(
        'Users not found, try again later.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/:id')
  async findOneUserById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const user = await this.userService.getUserById(id);
    if (user) {
      res.send(user);
    } else {
      throw new HttpException(
        'User with the given might not exist, try again.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
