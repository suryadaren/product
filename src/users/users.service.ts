import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DatabaseService } from 'src/common/database/database.service';
import { ErrorResponse } from 'src/common/responses/error.response';
import * as bcrypt from 'bcrypt';
import { SuccessResponse } from 'src/common/responses/success.response';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  async register(data: CreateUserDto) {
    const isUsernameExist = await this.databaseService.users.findUnique({
      where: {
        username: data.username,
      },
    });

    if (isUsernameExist) {
      throw new ErrorResponse(
        HttpStatus.CONFLICT,
        'Sorry, username already taken',
      );
    }

    const isEmailExist = await this.databaseService.users.findUnique({
      where: {
        email: data.email,
      },
    });

    if (isEmailExist) {
      throw new ErrorResponse(
        HttpStatus.CONFLICT,
        'Sorry, email already exist',
      );
    }

    const password = await bcrypt.hash(data.password, 10);
    data.password = password;

    const user = await this.databaseService.users.create({
      data: data,
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    return new SuccessResponse(
      HttpStatus.CREATED,
      'User Register Successfully',
      user,
    );
  }

  async findAll() {
    const users = await this.databaseService.users.findMany({
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    if (users.length < 1) {
      throw new ErrorResponse(HttpStatus.NOT_FOUND, 'Resource Not Found!');
    }

    return new SuccessResponse(HttpStatus.OK, 'Success Retrieve Data', users);
  }

  async getById(id: number) {
    const user = await this.databaseService.users.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    if (!user) {
      throw new ErrorResponse(HttpStatus.NOT_FOUND, 'Resource Not Found!');
    }

    return new SuccessResponse(HttpStatus.OK, 'Success Retrieve Data', user);
  }
}
