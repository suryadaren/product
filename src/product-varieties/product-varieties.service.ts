import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductVarietyDto } from './dto/create-product-variety.dto';
import { UpdateProductVarietyDto } from './dto/update-product-variety.dto';
import { DatabaseService } from 'src/common/database/database.service';
import { ErrorResponse } from 'src/common/responses/error.response';
import { SuccessResponse } from 'src/common/responses/success.response';

@Injectable()
export class ProductVarietiesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(data: CreateProductVarietyDto) {
    const product = await this.getProduct(data.product_id);
    if (!product) {
      throw new ErrorResponse(HttpStatus.NOT_FOUND, 'Product Not Found!');
    }
    const variety = await this.databaseService.productVarieties.create({
      data: data,
    });

    return new SuccessResponse(
      HttpStatus.CREATED,
      'Resource Created Successfully',
      variety,
    );
  }

  async update(id: number, data: UpdateProductVarietyDto) {
    const variety = await this.databaseService.productVarieties.findUnique({
      where: { id },
    });

    if (!variety) {
      throw new ErrorResponse(
        HttpStatus.NOT_FOUND,
        'Product Variety Not Found!',
      );
    }

    if (data.product_id) {
      const product = await this.getProduct(data.product_id);
      if (!product) {
        throw new ErrorResponse(HttpStatus.NOT_FOUND, 'Product Not Found!');
      }
    }

    const updateVariety = await this.databaseService.productVarieties.update({
      where: { id },
      data: data,
    });

    return new SuccessResponse(
      HttpStatus.OK,
      'Resource Updated Successfully',
      updateVariety,
    );
  }

  async findAll() {
    const varieties = await this.databaseService.productVarieties.findMany({
      select: {
        id: true,
        type: true,
        value: true,
        price: true,
        product: true,
      },
    });
    if (varieties.length < 1) {
      throw new ErrorResponse(
        HttpStatus.NOT_FOUND,
        'Product Varieties is Empty!',
      );
    }

    return new SuccessResponse(
      HttpStatus.OK,
      'Success Retrieve Data',
      varieties,
    );
  }

  async findOne(id: number) {
    const varietie = await this.databaseService.productVarieties.findUnique({
      where: { id },
      select: {
        id: true,
        type: true,
        value: true,
        price: true,
        product: true,
      },
    });
    if (!varietie) {
      throw new ErrorResponse(
        HttpStatus.NOT_FOUND,
        'Product Variety Not Found!',
      );
    }

    return new SuccessResponse(
      HttpStatus.OK,
      'Success Retrieve Data',
      varietie,
    );
  }

  async remove(id: number) {
    const variety = await this.databaseService.productVarieties.findUnique({
      where: { id },
    });
    if (!variety) {
      throw new ErrorResponse(
        HttpStatus.NOT_FOUND,
        'Product Variety Not Found!',
      );
    }

    await this.databaseService.productVarieties.delete({
      where: { id },
    });

    return new SuccessResponse(
      HttpStatus.NO_CONTENT,
      'Resource Deleted Successfully',
      variety,
    );
  }

  async getProduct(id: number) {
    return await this.databaseService.products.findUnique({
      where: { id },
    });
  }
}
