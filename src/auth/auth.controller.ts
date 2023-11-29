import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ErrorResponse } from 'src/common/responses/error.response';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from './auth.guard';
import { Roles } from './roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Roles(['admin'])
  @Post('register')
  register(@Body() data: RegisterDto) {
    try {
      return this.authService.register(data);
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

  @Post('login')
  async login(@Body() data: LoginDto) {
    try {
      return this.authService.login(data);
    } catch (error) {
      if (error instanceof ErrorResponse) {
        return error;
      }
      return new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }
}
