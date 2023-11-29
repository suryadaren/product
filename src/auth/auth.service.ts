import { HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/common/database/database.service';
import { LoginDto } from './dto/login.dto';
import { ErrorResponse } from 'src/common/responses/error.response';
import { JwtService } from '@nestjs/jwt';
import { SuccessResponse } from 'src/common/responses/success.response';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private jwt: JwtService,
  ) {}

  async register(data: RegisterDto) {
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

  async login(data: LoginDto) {
    const user = await this.databaseService.users.findUnique({
      where: {
        username: data.username,
      },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
        roles: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!user) {
      throw new ErrorResponse(HttpStatus.NOT_FOUND, 'User Not Found!');
    }

    if (await bcrypt.compare(data.password, user.password)) {
      const payload = {
        sub: user.id,
        username: user.username,
        email: user.email,
        roles: user.roles,
      };

      const token = await this.jwt.signAsync(payload);

      const data = {
        access_token: token,
      };
      return new SuccessResponse(HttpStatus.OK, 'Login Successfully', data);
    }

    throw new ErrorResponse(HttpStatus.UNAUTHORIZED, 'Password is invalid!');
  }
}
