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
import { ProductVarietiesService } from './product-varieties.service';
import { CreateProductVarietyDto } from './dto/create-product-variety.dto';
import { UpdateProductVarietyDto } from './dto/update-product-variety.dto';
import { ErrorResponse } from 'src/common/responses/error.response';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';

@UseGuards(AuthGuard)
@Controller('product-varieties')
export class ProductVarietiesController {
  constructor(
    private readonly productVarietiesService: ProductVarietiesService,
  ) {}

  @Roles(['admin'])
  @Post()
  async create(@Body() data: CreateProductVarietyDto) {
    try {
      return await this.productVarietiesService.create(data);
    } catch (error) {
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
  async update(@Param('id') id: string, @Body() data: UpdateProductVarietyDto) {
    try {
      return await this.productVarietiesService.update(+id, data);
    } catch (error) {
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
  @Get()
  async findAll() {
    try {
      return await this.productVarietiesService.findAll();
    } catch (error) {
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
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.productVarietiesService.findOne(+id);
    } catch (error) {
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
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.productVarietiesService.remove(+id);
    } catch (error) {
      if (error instanceof ErrorResponse) {
        throw error;
      }
      throw new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }
}
