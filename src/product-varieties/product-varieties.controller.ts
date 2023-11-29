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
    } catch (error) {
      if (error instanceof ErrorResponse) {
        throw error;
      }
      throw new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
    return await this.productVarietiesService.create(data);
  }

  @Roles(['admin'])
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateProductVarietyDto) {
    try {
    } catch (error) {
      if (error instanceof ErrorResponse) {
        throw error;
      }
      throw new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
    return await this.productVarietiesService.update(+id, data);
  }

  @Roles(['admin', 'user'])
  @Get()
  async findAll() {
    try {
    } catch (error) {
      if (error instanceof ErrorResponse) {
        throw error;
      }
      throw new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
    return await this.productVarietiesService.findAll();
  }

  @Roles(['admin'])
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
    } catch (error) {
      if (error instanceof ErrorResponse) {
        throw error;
      }
      throw new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
    return await this.productVarietiesService.findOne(+id);
  }

  @Roles(['admin', 'user'])
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
    } catch (error) {
      if (error instanceof ErrorResponse) {
        throw error;
      }
      throw new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
    return await this.productVarietiesService.remove(+id);
  }
}
