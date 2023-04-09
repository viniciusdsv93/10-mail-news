import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-users.dto';
import { Response } from 'express';
import { SkipAuth } from '../common/skipAuth/skipAuth';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  public getUsers() {
    return this.usersService.getUsers();
  }

  @Get('/:id')
  public getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @SkipAuth()
  @Post('/create')
  public async createUser(
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response,
  ) {
    const user = await this.usersService.createUser(createUserDto);

    response
      .status(HttpStatus.CREATED)
      .location(`/users/${user.id}`)
      .json(user);
  }
}
