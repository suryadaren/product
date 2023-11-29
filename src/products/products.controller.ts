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
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ErrorResponse } from 'src/common/responses/error.response';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';

@UseGuards(AuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles(['admin'])
  @Post()
  async create(@Body() data: CreateProductDto) {
    try {
      return await this.productsService.create(data);
    } catch (error) {
      if (error instanceof ErrorResponse) {
        throw error;
      } else {
        throw new ErrorResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          error.message,
        );
      }
    }
  }

  @Roles(['admin'])
  @Put(':id')
  async update(@Param('id') id: number, @Body() data: UpdateProductDto) {
    try {
      return await this.productsService.update(+id, data);
    } catch (error) {
      if (error instanceof ErrorResponse) {
        throw error;
      } else {
        throw new ErrorResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          error.message,
        );
      }
    }
  }

  @Roles(['admin', 'user'])
  @Get()
  async findAll() {
    try {
      return await this.productsService.findAll();
    } catch (error) {
      if (error instanceof ErrorResponse) {
        throw error;
      } else {
        throw new ErrorResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          error.message,
        );
      }
    }
  }

  @Roles(['admin', 'user'])
  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      return await this.productsService.findOne(+id);
    } catch (error) {
      if (error instanceof ErrorResponse) {
        throw error;
      } else {
        throw new ErrorResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          error.message,
        );
      }
    }
  }

  @Roles(['admin'])
  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      return await this.productsService.remove(+id);
    } catch (error) {
      if (error instanceof ErrorResponse) {
        throw error;
      } else {
        throw new ErrorResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          error.message,
        );
      }
    }
  }

  @Roles(['admin', 'user'])
  @Get(':product_id/product-varieties')
  async getProductVarieties(@Param('product_id') product_id: number) {
    try {
      return await this.productsService.getProductVarieties(+product_id);
    } catch (error) {
      if (error instanceof ErrorResponse) {
        throw error;
      } else {
        throw new ErrorResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          error.message,
        );
      }
    }
  }

  @Roles(['admin', 'user'])
  @Get(':product_id/product-ratings')
  async getProductRatings(@Param('product_id') product_id: number) {
    try {
      return await this.productsService.getProductRatings(+product_id);
    } catch (error) {
      if (error instanceof ErrorResponse) {
        throw error;
      } else {
        throw new ErrorResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          error.message,
        );
      }
    }
  }
}
