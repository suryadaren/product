import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ErrorResponse } from 'src/common/responses/error.response';
import { RegisterDto } from './dto/register.dto';
import { ApiTags } from '@nestjs/swagger';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() data: RegisterDto) {
    try {
      return this.authService.register(data);
    } catch (error) {
      if (error instanceof ErrorResponse) {
        throw error;
      }
      throw new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }

  @Post('login')
  async login(@Body() data: LoginDto) {
    try {
      return this.authService.login(data);
    } catch (error) {
      if (error instanceof ErrorResponse) {
        return error;
      }
      throw new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }

  @Post('reset-password')
  async resetPassword(@Body() data: ResetPasswordDto) {
    try {
      return this.authService.resetPassword(data);
    } catch (error) {
      if (error instanceof ErrorResponse) {
        return error;
      }
      throw new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }
}
