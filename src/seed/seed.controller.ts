import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { ErrorResponse } from 'src/common/responses/error.response';
import { SeedService } from './seed.service';

@UseGuards(AuthGuard)
@Roles(['admin'])
@Controller('seed')
export class SeedController {
  constructor(private seedService: SeedService) {}

  @Get('dummy-products')
  async dummyProducts() {
    try {
      return await this.seedService.dummyProducts();
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

  @Get('dummy-product-varieties')
  async dummyProductVarieties() {
    try {
      return await this.seedService.dummyProductVarieties();
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

  @Get('dummy-product-ratings')
  async dummyProductRatings() {
    try {
      return await this.seedService.dummyProductRatings();
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
