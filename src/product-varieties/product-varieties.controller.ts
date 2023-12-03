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
import { ProductVarietiesService } from './product-varieties.service';
import { CreateProductVarietyDto } from './dto/create-product-variety.dto';
import { UpdateProductVarietyDto } from './dto/update-product-variety.dto';
import { ErrorResponse } from 'src/common/responses/error.response';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('product variety')
@UseGuards(AuthGuard)
@Controller('product-varieties')
export class ProductVarietiesController {
  constructor(
    private readonly productVarietiesService: ProductVarietiesService,
    private readonly logger: Logger,
  ) {}

  @Roles(['admin'])
  @Post()
  async create(@Body() data: CreateProductVarietyDto) {
    this.logger.log('[POST] api/v1/product-varieties');
    try {
      const variety = await this.productVarietiesService.create(data);
      this.logger.log('create product variety successfully');
      return variety;
    } catch (error) {
      if (error instanceof ErrorResponse) {
        this.logger.error('create product variety failed', error);
        throw error;
      }
      this.logger.error('create product variety failed', error.message);
      throw new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }

  @Roles(['admin'])
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateProductVarietyDto) {
    this.logger.log('[PUT] api/v1/product-varieties/:id');
    try {
      const variety = await this.productVarietiesService.update(+id, data);
      this.logger.log('update product variety successfully');
      return variety;
    } catch (error) {
      if (error instanceof ErrorResponse) {
        this.logger.error('update product variety failed', error);
        throw error;
      }
      this.logger.error('update product variety failed', error.message);
      throw new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }

  @Roles(['admin', 'user'])
  @Get()
  async findAll() {
    this.logger.log('[GET] api/v1/product-varieties');
    try {
      const varieties = await this.productVarietiesService.findAll();
      this.logger.log('get product varieties successfully');
      return varieties;
    } catch (error) {
      if (error instanceof ErrorResponse) {
        this.logger.error('get product varieties failed', error);
        throw error;
      }
      this.logger.error('get product varieties failed', error.message);
      throw new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }

  @Roles(['admin'])
  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.logger.log('[GET] api/v1/product-varieties/:id');
    try {
      const variety = await this.productVarietiesService.findOne(+id);
      this.logger.log('get product variety successfully');
      return variety;
    } catch (error) {
      if (error instanceof ErrorResponse) {
        this.logger.error('get product variety failed', error);
        throw error;
      }
      this.logger.error('get product variety failed', error.message);
      throw new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }

  @Roles(['admin', 'user'])
  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.logger.log('[DELETE] api/v1/product-varieties/:id');
    try {
      const variety = await this.productVarietiesService.remove(+id);
      this.logger.log('delete product variety successfully');
      return variety;
    } catch (error) {
      if (error instanceof ErrorResponse) {
        this.logger.error('delete product variety failed', error);
        throw error;
      }
      this.logger.error('delete product variety failed', error.message);
      throw new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }
}
