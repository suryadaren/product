import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { ProductRatingsController } from './product-ratings.controller';
import { ProductRatingsService } from './product-ratings.service';
import { DatabaseService } from 'src/common/database/database.service';
import { JwtService } from '@nestjs/jwt';

describe('ProductRatingsController', () => {
  let controller: ProductRatingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductRatingsController],
      providers: [ProductRatingsService, Logger, DatabaseService, JwtService],
    }).compile();

    controller = module.get<ProductRatingsController>(ProductRatingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
