import {
  Controller,
  HttpStatus,
  Get,
  Param,
  UseGuards,
  Logger,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ErrorResponse } from 'src/common/responses/error.response';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: Logger,
  ) {}

  @Roles(['admin'])
  @Get()
  async findAll() {
    this.logger.log('[GET] api/v1/users');
    try {
      const users = await this.usersService.findAll();
      this.logger.log('get users successfully');
      return users;
    } catch (error) {
      if (error instanceof ErrorResponse) {
        this.logger.error('get users failed', error);
        throw error;
      }
      this.logger.error('get users failed', error.message);
      throw new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }

  @Roles(['admin'])
  @Get(':id')
  async getById(@Param('id') id: number) {
    this.logger.log('[GET] api/v1/users/:id');
    try {
      const user = await this.usersService.getById(+id);
      this.logger.log('get user successfully');
      return user;
    } catch (error) {
      if (error instanceof ErrorResponse) {
        this.logger.error('get user failed', error);
        throw error;
      }
      this.logger.error('get user failed', error.message);
      throw new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }

  @Get('admin/set-admin')
  async setAdmin(@Request() req) {
    this.logger.log('[GET] api/v1/users/admin/set-admin');
    try {
      const user = await this.usersService.setAdmin(+req.user.sub);
      this.logger.log('set user as admin successfully');
      return user;
    } catch (error) {
      if (error instanceof ErrorResponse) {
        this.logger.error('set user as admin', error);
        throw error;
      }
      this.logger.error('set user as admin', error.message);
      throw new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }
}
