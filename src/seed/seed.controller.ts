import { Controller, Get, HttpStatus, Logger, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { ErrorResponse } from 'src/common/responses/error.response';
import { SeedService } from './seed.service';

@UseGuards(AuthGuard)
@Roles(['admin'])
@Controller('seed')
export class SeedController {
  constructor(
    private readonly seedService: SeedService,
    private readonly logger: Logger,
  ) {}

  @Get('dummy-products')
  async dummyProducts() {
    this.logger.log('[GET] api/v1/seed/dummy-products');
    try {
      const dummy = await this.seedService.dummyProducts();
      this.logger.log('insert dummy products successfully');
      return dummy;
    } catch (error) {
      if (error instanceof ErrorResponse) {
        this.logger.error('insert dummy products failed', error);
        throw error;
      }
      this.logger.error('insert dummy products failed', error.message);
      throw new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }

  @Get('dummy-product-varieties')
  async dummyProductVarieties() {
    this.logger.log('[GET] api/v1/seed/dummy-product-varieties');
    try {
      const dummy = await this.seedService.dummyProductVarieties();
      this.logger.log('insert dummy product varieties successfully');
      return dummy;
    } catch (error) {
      if (error instanceof ErrorResponse) {
        this.logger.error('insert dummy product varieties failed', error);
        throw error;
      }
      this.logger.error('insert dummy product varieties failed', error.message);
      throw new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }

  @Get('dummy-product-ratings')
  async dummyProductRatings() {
    this.logger.log('[GET] api/v1/seed/dummy-product-ratings');
    try {
      const dummy = await this.seedService.dummyProductRatings();
      this.logger.log('insert dummy product ratings successfully');
      return dummy;
    } catch (error) {
      if (error instanceof ErrorResponse) {
        this.logger.error('insert dummy product ratings failed', error);
        throw error;
      }
      this.logger.error('insert dummy product ratings failed', error.message);
      throw new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }
}
