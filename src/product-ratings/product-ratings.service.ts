import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductRatingDto } from './dto/create-product-rating.dto';
import { DatabaseService } from 'src/common/database/database.service';
import { ErrorResponse } from 'src/common/responses/error.response';
import { SuccessResponse } from 'src/common/responses/success.response';

@Injectable()
export class ProductRatingsService {
  constructor(private databaseService: DatabaseService) {}

  async create(data: CreateProductRatingDto) {
    const product = await this.getProduct(data.product_id);

    if (!product) {
      throw new ErrorResponse(HttpStatus.NOT_FOUND, 'Resource Not Found');
    }

    const newRatingAverage = await this.countNewRatingAverage(
      data.product_id,
      data.value,
    );

    const createAndUpdate = await this.databaseService.$transaction(
      async (prisma) => {
        const productRating = await prisma.productRatingDetails.create({
          data: data,
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
    const productRatings =
      await this.databaseService.productRatingDetails.findMany();

    if (productRatings.length < 1) {
      throw new ErrorResponse(HttpStatus.NOT_FOUND, 'Resource Not Found!');
    }

    return new SuccessResponse(
      HttpStatus.OK,
      'Success Retrieve Data',
      productRatings,
    );
  }

  async findOne(id: number) {
    const productRating =
      await this.databaseService.productRatingDetails.findUnique({
        where: { id },
      });

    if (!productRating) {
      throw new ErrorResponse(HttpStatus.NOT_FOUND, 'Resource Not Found!');
    }

    return new SuccessResponse(
      HttpStatus.OK,
      'Success Retrieve Data',
      productRating,
    );
  }

  async remove(id: number) {
    const productRating =
      await this.databaseService.productRatingDetails.findUnique({
        where: { id },
      });

    if (!productRating) {
      throw new ErrorResponse(HttpStatus.NOT_FOUND, 'Resource Not Found!');
    }

    await this.databaseService.productRatingDetails.delete({
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
    const sumRating = await this.databaseService.productRatingDetails.aggregate(
      {
        _sum: {
          value: true,
        },
        where: { product_id },
      },
    );
    let totalRatingCount =
      await this.databaseService.productRatingDetails.count({
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
