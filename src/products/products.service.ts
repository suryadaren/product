import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DatabaseService } from 'src/common/database/database.service';
import { ErrorResponse } from 'src/common/responses/error.response';
import { SuccessResponse } from 'src/common/responses/success.response';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(data: CreateProductDto) {
    const product = await this.databaseService.products.create({
      data: data,
    });
    return new SuccessResponse(
      HttpStatus.CREATED,
      'Resource Created Successfully',
      product,
    );
  }

  async update(id: number, data: UpdateProductDto) {
    const product = await this.databaseService.products.findUnique({
      where: { id },
    });

    if (!product) {
      throw new ErrorResponse(HttpStatus.NOT_FOUND, 'Product Not Found!');
    }

    const updateProduct = await this.databaseService.products.update({
      where: { id },
      data: data,
    });

    return new SuccessResponse(
      HttpStatus.OK,
      'Resource Updated Successfully',
      updateProduct,
    );
  }

  async findAll() {
    const products = await this.databaseService.products.findMany();
    if (products.length < 1) {
      throw new ErrorResponse(HttpStatus.NOT_FOUND, 'Products is Empty!');
    }
    return new SuccessResponse(HttpStatus.OK, 'Success Retrive Data', products);
  }

  async findOne(id: number) {
    const product = await this.databaseService.products.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        stock: true,
        rating: true,
        productVarieties: true,
        productRatings: true,
      },
    });

    if (!product) {
      throw new ErrorResponse(HttpStatus.NOT_FOUND, 'Product Not Found!');
    }
    return new SuccessResponse(HttpStatus.OK, 'Success Retrive Data', product);
  }

  async remove(id: number) {
    const product = await this.databaseService.products.findUnique({
      where: { id },
    });

    if (!product) {
      throw new ErrorResponse(HttpStatus.NOT_FOUND, 'Product Not Found!');
    }

    await this.databaseService.products.delete({
      where: { id },
    });

    return new SuccessResponse(
      HttpStatus.NO_CONTENT,
      'Resource deleted successfully',
      product,
    );
  }

  async getProductVarieties(product_id: number) {
    const product = await this.databaseService.products.findUnique({
      where: { id: product_id },
    });

    if (!product) {
      throw new ErrorResponse(HttpStatus.NOT_FOUND, 'Product Not Found!');
    }

    const varieties = await this.databaseService.productVarieties.findMany({
      where: { product_id },
    });

    if (varieties.length < 1) {
      throw new ErrorResponse(
        HttpStatus.NOT_FOUND,
        'Product Varieties is Empty!',
      );
    }

    return new SuccessResponse(
      HttpStatus.OK,
      'Success Retrive Data',
      varieties,
    );
  }

  async getProductRatings(product_id: number) {
    const product = await this.databaseService.products.findUnique({
      where: { id: product_id },
    });

    if (!product) {
      throw new ErrorResponse(HttpStatus.NOT_FOUND, 'Product Not Found!');
    }

    const ratings = await this.databaseService.productRatings.findMany({
      where: { product_id },
    });

    if (ratings.length < 1) {
      throw new ErrorResponse(
        HttpStatus.NOT_FOUND,
        'Product Ratings is Empty!',
      );
    }

    return new SuccessResponse(HttpStatus.OK, 'Success Retrive Data', ratings);
  }
}
