import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from '../services/user.service';
import { UserPartialTypeDto, UsersDto } from '../dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersServices: UsersService) {}

  @Get('/')
  async getUsers() {
    const users = await this.usersServices.getUsers();
    const data = {
      data: users,
      message: 'ok',
    };
    console.log(data);
    return data;
  }

  @Post('/')
  async createUser(@Body() payload: UsersDto) {
    const user = await this.usersServices.create(payload);
    const data = {
      data: user,
      message: 'ok',
    };
    console.log(data);
    return data;
  }

  @Get('/:id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    return await this.usersServices.getUser(id);
  }

  @Put('/:id')
  async updatedUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UserPartialTypeDto,
  ) {
    return await this.usersServices.updated(id, payload);
  }
}
