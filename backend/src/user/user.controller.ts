import {
  Controller,
  Get,
  Req,
  Res,
  Body,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { Request, Response } from 'express';
import {} from '@nestjs/common';
import { UserResponseDto } from './dto/user-response.dto';
import { SerializeOptions } from '@nestjs/common';

@Controller('user')
// @UseInterceptors(ClassSerializerInterceptor)
// @SerializeOptions({
//   strategy: 'excludeAll',
// })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({
    description: 'List of users has been successfully fetched',
  })
  @ApiResponse({
    status: 404,
    description: 'No users found.',
  })
  async getAllUsers(@Req() req: Request, @Res() res: Response) {
    const users = await this.userService.getAllUsers();
    if (users) {
      const lessUserDataArray = [];
      users.forEach((user) => {
        const lessUserData = new UserResponseDto({
          login: user.login,
          avatar_url: user.avatar_url,
          type: user.type,
        });
        lessUserDataArray.push(lessUserData);
      });
      res.send(lessUserDataArray);
      // res.send(users);
    } else {
      throw new HttpException(
        'Users not found, try again later.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'An id of an existing user or owner',
    type: Number,
    example: 70908,
  })
  @ApiOkResponse({
    description: 'The requested user has been successfully fetched',
  })
  @ApiResponse({
    status: 404,
    description: 'No user found with the given id.',
  })
  async findOneUserById(
    // @Body() createUserDto: UserResponseDto,
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const user = await this.userService.getUserById(id);
    if (user) {
      // console.log('@@USER', user);
      // res.send(user);
      const lessUserData = new UserResponseDto({
        login: user.login,
        avatar_url: user.avatar_url,
        type: user.type,
      });
      res.send(lessUserData);
    } else {
      throw new HttpException(
        'User with the given might not exist, try again.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
