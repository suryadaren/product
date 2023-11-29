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
} from '@nestjs/common';
import { ProductRatingsService } from './product-ratings.service';
import { CreateProductRatingDto } from './dto/create-product-rating.dto';
import { ErrorResponse } from 'src/common/responses/error.response';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';

@UseGuards(AuthGuard)
@Controller('product-ratings')
export class ProductRatingsController {
  constructor(private readonly ratingsService: ProductRatingsService) {}

  @Roles(['user'])
  @Post()
  create(
    @Request() req,
    @Body() createProductRatingDto: CreateProductRatingDto,
  ) {
    try {
      return this.ratingsService.create(+req.user.sub, createProductRatingDto);
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

  @Roles(['admin', 'user'])
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

  @Roles(['admin', 'user'])
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

  @Roles(['user'])
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
