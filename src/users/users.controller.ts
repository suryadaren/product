import { Controller, Post, Body, HttpStatus, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ErrorResponse } from 'src/common/responses/error.response';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  register(@Body() data: CreateUserDto) {
    try {
      return this.usersService.register(data);
    } catch (error) {
      if (error instanceof ErrorResponse) {
        throw error;
      }
      return new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }

  @Get()
  findAll() {
    try {
      return this.usersService.findAll();
    } catch (error) {
      if (error instanceof ErrorResponse) {
        throw error;
      }
      return new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    try {
      return this.usersService.getById(+id);
    } catch (error) {
      if (error instanceof ErrorResponse) {
        throw error;
      }
      return new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }
}
