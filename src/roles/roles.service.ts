import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { DatabaseService } from 'src/common/database/database.service';
import { ErrorResponse } from 'src/common/responses/error.response';
import { SuccessResponse } from 'src/common/responses/success.response';

@Injectable()
export class RolesService {
  constructor(private databaseService: DatabaseService) {}

  async create(data: CreateRoleDto) {
    const user = await this.databaseService.users.findUnique({
      where: {
        id: data.user_id,
      },
    });

    if (!user) {
      throw new ErrorResponse(HttpStatus.NOT_FOUND, 'User Not Found');
    }

    const role = await this.databaseService.roles.create({
      data: data,
      select: {
        id: true,
        name: true,
        description: true,
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });
    return new SuccessResponse(
      HttpStatus.CREATED,
      'Resource Created Successfully',
      role,
    );
  }

  async update(id: number, data: UpdateRoleDto) {
    const role = await this.databaseService.roles.findUnique({ where: { id } });

    if (!role) {
      throw new ErrorResponse(HttpStatus.NOT_FOUND, 'Role Not Found');
    }

    if (data.user_id) {
      const user = await this.databaseService.users.findUnique({
        where: {
          id: data.user_id,
        },
      });

      if (!user) {
        throw new ErrorResponse(HttpStatus.NOT_FOUND, 'User Not Found');
      }
    }

    const updateRole = await this.databaseService.roles.update({
      where: { id },
      data: data,
      select: {
        id: true,
        name: true,
        description: true,
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    return new SuccessResponse(
      HttpStatus.OK,
      'Resource Updated Successfully',
      updateRole,
    );
  }

  async remove(id: number) {
    const role = await this.databaseService.roles.findUnique({
      where: { id },
    });

    if (!role) {
      throw new ErrorResponse(HttpStatus.NOT_FOUND, 'Role Not Found!');
    }

    await this.databaseService.roles.delete({
      where: { id },
    });

    return new SuccessResponse(
      HttpStatus.NO_CONTENT,
      'Resource deleted successfully',
      role,
    );
  }

  async findAll() {
    const roles = await this.databaseService.roles.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });
    if (roles.length < 1) {
      throw new ErrorResponse(HttpStatus.NOT_FOUND, 'Roles is Empty!');
    }
    return new SuccessResponse(HttpStatus.OK, 'Success Retrive Data', roles);
  }

  async findOne(id: number) {
    const roles = await this.databaseService.roles.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });
    if (!roles) {
      throw new ErrorResponse(HttpStatus.NOT_FOUND, 'Role Not Found!');
    }
    return new SuccessResponse(HttpStatus.OK, 'Success Retrive Data', roles);
  }
}
