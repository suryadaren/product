import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  Request,
  Logger,
} from '@nestjs/common';
import { ProductRatingsService } from './product-ratings.service';
import { CreateProductRatingDto } from './dto/create-product-rating.dto';
import { ErrorResponse } from 'src/common/responses/error.response';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('product ratings')
@UseGuards(AuthGuard)
@Controller('product-ratings')
export class ProductRatingsController {
  constructor(
    private readonly ratingsService: ProductRatingsService,
    private readonly logger: Logger,
  ) {}

  @Roles(['user'])
  @Post()
  async create(
    @Request() req,
    @Body() createProductRatingDto: CreateProductRatingDto,
  ) {
    this.logger.log('[POST] api/v1/product-ratings');
    try {
      const rating = await this.ratingsService.create(
        +req.user.sub,
        createProductRatingDto,
      );

      this.logger.log('create product ratings successfully');

      return rating;
    } catch (error) {
      if (error instanceof ErrorResponse) {
        this.logger.error('create product ratings failed', error);
        throw error;
      }
      this.logger.error('create product ratings failed', error.message);
      throw new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }

  @Roles(['admin', 'user'])
  @Get()
  async findAll() {
    this.logger.log('[GET] api/v1/product-ratings');
    try {
      const ratings = await this.ratingsService.findAll();
      this.logger.log('get product ratings successfully');
      return ratings;
    } catch (error) {
      if (error instanceof ErrorResponse) {
        this.logger.error('get product ratings failed', error);
        throw error;
      }

      this.logger.error('get product ratings failed', error.message);
      throw new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }

  @Roles(['admin', 'user'])
  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.logger.log('[GET] api/v1/product-ratings/:id');
    try {
      const rating = await this.ratingsService.findOne(+id);
      this.logger.log('get product rating successfully');
      return rating;
    } catch (error) {
      if (error instanceof ErrorResponse) {
        this.logger.error('get product rating failed', error);
        throw error;
      }

      this.logger.error('get product rating failed', error.message);
      throw new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }

  @Roles(['user'])
  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.logger.log('[DELETE] api/v1/product-ratings/:id');
    try {
      const rating = await this.ratingsService.remove(+id);
      this.logger.log('delete product rating successfully');
      return rating;
    } catch (error) {
      if (error instanceof ErrorResponse) {
        this.logger.error('delete product rating failed', error);
        throw error;
      }
      this.logger.error('delete product rating failed', error.message);
      throw new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }
}
