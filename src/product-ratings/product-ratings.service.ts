import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductRatingDto } from './dto/create-product-rating.dto';
import { DatabaseService } from 'src/common/database/database.service';
import { ErrorResponse } from 'src/common/responses/error.response';
import { SuccessResponse } from 'src/common/responses/success.response';

@Injectable()
export class ProductRatingsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(user_id: number, data: CreateProductRatingDto) {
    const product = await this.getProduct(data.product_id);

    if (!product) {
      throw new ErrorResponse(HttpStatus.NOT_FOUND, 'Product Not Found!');
    }

    const newRatingAverage = await this.countNewRatingAverage(
      data.product_id,
      data.value,
    );

    const createAndUpdate = await this.databaseService.$transaction(
      async (prisma) => {
        const productRating = await prisma.productRatings.create({
          data: {
            value: data.value,
            user_id: user_id,
            product_id: data.product_id,
          },
        });

        const productUpdate = await prisma.products.update({
          where: {
            id: data.product_id,
          },
          data: {
            rating: newRatingAverage,
          },
        });

        return { productRating, productUpdate };
      },
    );

    return new SuccessResponse(
      HttpStatus.CREATED,
      'Resource Created and Updated Successfully',
      createAndUpdate,
    );
  }

  async findAll() {
    const productRatings = await this.databaseService.productRatings.findMany({
      select: {
        id: true,
        value: true,
        product: true,
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    if (productRatings.length < 1) {
      throw new ErrorResponse(HttpStatus.NOT_FOUND, 'Product Rating is Empty!');
    }

    return new SuccessResponse(
      HttpStatus.OK,
      'Success Retrieve Data',
      productRatings,
    );
  }

  async findOne(id: number) {
    const productRating = await this.databaseService.productRatings.findUnique({
      where: { id },
      select: {
        id: true,
        value: true,
        product: true,
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    if (!productRating) {
      throw new ErrorResponse(
        HttpStatus.NOT_FOUND,
        'Product Rating Not Found!',
      );
    }

    return new SuccessResponse(
      HttpStatus.OK,
      'Success Retrieve Data',
      productRating,
    );
  }

  async remove(id: number) {
    const productRating = await this.databaseService.productRatings.findUnique({
      where: { id },
    });

    if (!productRating) {
      throw new ErrorResponse(
        HttpStatus.NOT_FOUND,
        'Product Rating Not Found!',
      );
    }

    await this.databaseService.productRatings.delete({
      where: { id },
    });

    return new SuccessResponse(
      HttpStatus.NO_CONTENT,
      'Resource Deleted Successfully',
      productRating,
    );
  }

  async getProduct(id: number) {
    return this.databaseService.products.findUnique({
      where: { id },
    });
  }

  async countNewRatingAverage(product_id: number, newRating: number) {
    const sumRating = await this.databaseService.productRatings.aggregate({
      _sum: {
        value: true,
      },
      where: { product_id },
    });
    let totalRatingCount = await this.databaseService.productRatings.count({
      where: { product_id },
    });
    totalRatingCount += 1;

    const previousTotal = sumRating._sum.value ?? 0;

    const newRatingTotal = newRating + previousTotal;
    const result = newRatingTotal / totalRatingCount;
    const resultWithTwoDecimal = Math.round(result * 100) / 100;

    return resultWithTwoDecimal;
  }
}
