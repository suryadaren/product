import { HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/common/database/database.service';
import { ErrorResponse } from 'src/common/responses/error.response';
import { SuccessResponse } from 'src/common/responses/success.response';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  async findAll() {
    const users = await this.databaseService.users.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        roles: true,
      },
    });

    if (users.length < 1) {
      throw new ErrorResponse(HttpStatus.NOT_FOUND, 'Users is Empty!');
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
        roles: true,
      },
    });

    if (!user) {
      throw new ErrorResponse(HttpStatus.NOT_FOUND, 'User Not Found!');
    }

    return new SuccessResponse(HttpStatus.OK, 'Success Retrieve Data', user);
  }
}
