import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Put,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ErrorResponse } from 'src/common/responses/error.response';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Roles(['admin'])
@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(
    private readonly rolesService: RolesService,
    private readonly logger: Logger,
  ) {}

  @Post()
  async create(@Body() data: CreateRoleDto) {
    this.logger.log('[POST] api/v1/roles');
    try {
      const role = await this.rolesService.create(data);
      this.logger.log('create role successfully');
      return role;
    } catch (error) {
      if (error instanceof ErrorResponse) {
        this.logger.error('create role failed', error);
        throw error;
      }
      this.logger.error('create role failed', error.message);
      throw new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }

  @Get()
  async findAll() {
    this.logger.log('[GET] api/v1/roles');
    try {
      const roles = await this.rolesService.findAll();
      this.logger.log('get roles successfully');
      return roles;
    } catch (error) {
      if (error instanceof ErrorResponse) {
        this.logger.error('get roles failed', error);
        throw error;
      }
      this.logger.error('get roles failed', error.message);
      throw new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.logger.log('[GET] api/v1/roles/:id');
    try {
      const role = await this.rolesService.findOne(+id);
      this.logger.log('get role successfully');
      return role;
    } catch (error) {
      if (error instanceof ErrorResponse) {
        this.logger.error('get role failed', error);
        throw error;
      }
      this.logger.error('get role failed', error.message);
      throw new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateRoleDto) {
    this.logger.log('[PUT] api/v1/roles/:id');
    try {
      const role = await this.rolesService.update(+id, data);
      this.logger.log('update role successfully');
      return role;
    } catch (error) {
      if (error instanceof ErrorResponse) {
        this.logger.error('update role failed', error);
        throw error;
      }
      this.logger.error('update role failed', error.message);
      throw new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.logger.log('[DELETE] api/v1/roles/:id');
    try {
      const role = await this.rolesService.remove(+id);
      this.logger.log('delete role successfully');
      return role;
    } catch (error) {
      if (error instanceof ErrorResponse) {
        this.logger.error('delete role failed', error);
        throw error;
      }
      this.logger.error('delete role failed', error.message);
      throw new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }
}
