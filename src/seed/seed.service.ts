import { HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/common/database/database.service';
import { faker } from '@faker-js/faker';
import { SuccessResponse } from 'src/common/responses/success.response';
import { ErrorResponse } from 'src/common/responses/error.response';
import { ProductRatingsService } from 'src/product-ratings/product-ratings.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly databaseService: DatabaseService,
    private productRatingService: ProductRatingsService,
  ) {}

  async dummyProducts() {
    const data = Array.from({ length: 10 }).map(() => ({
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      stock: faker.number.int({ min: 80, max: 120 }),
      rating: 0,
    }));

    const create = await this.databaseService.products.createMany({
      data: data,
    });

    return new SuccessResponse(
      HttpStatus.CREATED,
      'Create Dummy Products Succesfully',
      create,
    );
  }

  async dummyProductVarieties() {
    const products = await this.databaseService.products.findMany();

    if (products.length < 1) {
      throw new ErrorResponse(HttpStatus.NOT_FOUND, 'Products is Empty!');
    }

    const varieties = products.flatMap((product) => {
      return Array.from({ length: 3 }).map(() => ({
        product_id: product.id,
        type: 'color',
        value: faker.color.human(),
        price:
          Math.ceil(faker.number.int({ min: 100000, max: 200000 }) / 10000) *
          10000,
      }));
    });

    const inputVarieties =
      await this.databaseService.productVarieties.createMany({
        data: varieties,
      });

    return new SuccessResponse(
      HttpStatus.CREATED,
      'Create Dummy Varieties Successfully',
      inputVarieties,
    );
  }

  async dummyProductRatings() {
    const products = await this.databaseService.products.findMany();

    if (products.length < 1) {
      throw new ErrorResponse(HttpStatus.NOT_FOUND, 'Products is Empty!');
    }

    const user = await this.databaseService.users.findFirst({
      where: {
        roles: {
          some: {
            name: 'user',
          },
        },
      },
      select: {
        id: true,
      },
    });

    const data = { count: 0 };
    products.map(async (product) => {
      data.count++;
      const ratingData = {
        product_id: product.id,
        value: faker.number.int({ min: 1, max: 5 }),
      };

      await this.productRatingService.create(+user.id, ratingData);
    });

    return new SuccessResponse(
      HttpStatus.CREATED,
      'Create Dummy Ratings Successfully',
      data,
    );
  }
}
