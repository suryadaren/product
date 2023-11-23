import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { ProductRatingsService } from './product-ratings.service';
import { CreateProductRatingDto } from './dto/create-product-rating.dto';
import { ErrorResponse } from 'src/common/responses/error.response';

@Controller('product-ratings')
export class ProductRatingsController {
  constructor(private readonly ratingsService: ProductRatingsService) {}

  @Post()
  create(@Body() createProductRatingDto: CreateProductRatingDto) {
    try {
      return this.ratingsService.create(createProductRatingDto);
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

  @Get()
  findAll() {
    try {
      return this.ratingsService.findAll();
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.ratingsService.findOne(+id);
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.ratingsService.remove(+id);
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
}
