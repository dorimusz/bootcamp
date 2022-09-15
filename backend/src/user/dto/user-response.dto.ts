import { ApiProperty } from '@nestjs/swagger';
// import { Exclude } from 'class-transformer';

export class UserResponseDto {
  // @ApiProperty()
  login: string;

  // @ApiProperty()
  avatar_url: string;

  // @ApiProperty()
  type: string;

  // @Exclude()
  // html_url: string;

  // @Exclude()
  // userId: number;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
