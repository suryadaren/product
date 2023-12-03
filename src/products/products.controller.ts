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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ErrorResponse } from 'src/common/responses/error.response';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@UseGuards(AuthGuard)
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly logger: Logger,
  ) {}

  @Roles(['admin'])
  @Post()
  async create(@Body() data: CreateProductDto) {
    this.logger.log('[POST] api/v1/products');
    try {
      const product = await this.productsService.create(data);
      this.logger.log('create product successfully');
      return product;
    } catch (error) {
      this.logger.error('create product failed', error);
      if (error instanceof ErrorResponse) {
        throw error;
      }
      throw new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }

  @Roles(['admin'])
  @Put(':id')
  async update(@Param('id') id: number, @Body() data: UpdateProductDto) {
    this.logger.log('[PUT] api/v1/products/:id');
    try {
      const product = await this.productsService.update(+id, data);
      this.logger.log('update product successfully');
      return product;
    } catch (error) {
      this.logger.error('update product failed');
      if (error instanceof ErrorResponse) {
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
  @Get()
  async findAll() {
    this.logger.log('[GET] api/v1/products');
    try {
      const products = await this.productsService.findAll();
      this.logger.log('get products successfully');
      return products;
    } catch (error) {
      this.logger.error('get products failed');
      if (error instanceof ErrorResponse) {
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
  async findOne(@Param('id') id: number) {
    this.logger.log('[GET] api/v1/products/:id');
    try {
      const product = await this.productsService.findOne(+id);
      this.logger.log('get product successfully');
      return product;
    } catch (error) {
      this.logger.error('get product failed', error);
      if (error instanceof ErrorResponse) {
        throw error;
      }
      throw new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }

  @Roles(['admin'])
  @Delete(':id')
  async remove(@Param('id') id: number) {
    this.logger.log('[DELETE] api/v1/products/:id');
    try {
      const product = await this.productsService.remove(+id);
      this.logger.log('delete product successfully');
      return product;
    } catch (error) {
      this.logger.error('delete product failed', error);
      if (error instanceof ErrorResponse) {
        throw error;
      }
      throw new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }

  @Roles(['admin', 'user'])
  @Get(':product_id/product-varieties')
  async getProductVarieties(@Param('product_id') product_id: number) {
    this.logger.log('[GET] api/v1/products/:product_id/product-varieties');
    try {
      const varieties =
        await this.productsService.getProductVarieties(+product_id);
      this.logger.log('get product varieties successfully');
      return varieties;
    } catch (error) {
      this.logger.error('get product varieties failed');
      if (error instanceof ErrorResponse) {
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
  @Get(':product_id/product-ratings')
  async getProductRatings(@Param('product_id') product_id: number) {
    this.logger.log('[GET] api/v1/products');
    try {
      const ratings = await this.productsService.getProductRatings(+product_id);
      this.logger.log('get product ratings successfully');
      return ratings;
    } catch (error) {
      this.logger.error('get product ratings failed', error);
      if (error instanceof ErrorResponse) {
        throw error;
      }
      this.logger.error('get product ratings failed', error.message);
      throw new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }
}
