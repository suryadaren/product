import { Body, Controller, HttpStatus, Logger, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ErrorResponse } from 'src/common/responses/error.response';
import { RegisterDto } from './dto/register.dto';
import { ApiTags } from '@nestjs/swagger';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: Logger,
  ) {}

  @Post('register')
  async register(@Body() data: RegisterDto) {
    this.logger.log('[POST] api/v1/auth/register');
    try {
      const register = await this.authService.register(data);
      this.logger.log('register successfully');
      return register;
    } catch (error) {
      if (error instanceof ErrorResponse) {
        this.logger.error('Register failed', error);
        throw error;
      }
      this.logger.error('Register failed', error.message);
      throw new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }

  @Post('login')
  async login(@Body() data: LoginDto) {
    this.logger.log('[POST] api/v1/auth/login');
    try {
      const login = await this.authService.login(data);
      this.logger.log('login successfully');
      return login;
    } catch (error) {
      if (error instanceof ErrorResponse) {
        this.logger.error('login failed', error);
        throw error;
      }
      this.logger.error('login failed', error.message);
      throw new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }

  @Post('reset-password')
  async resetPassword(@Body() data: ResetPasswordDto) {
    this.logger.log('[POST] api/v1/auth/reset-password');
    try {
      const reset = await this.authService.resetPassword(data);
      this.logger.log('Reset Password successfully');
      return reset;
    } catch (error) {
      if (error instanceof ErrorResponse) {
        this.logger.error('riset Password failed', error);
        throw error;
      }
      this.logger.error('riset Password failed', error.message);
      throw new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }
}
