import { Test, TestingModule } from '@nestjs/testing';
import { ProductVarietiesController } from './product-varieties.controller';
import { ProductVarietiesService } from './product-varieties.service';
import { DatabaseService } from 'src/common/database/database.service';
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

describe('ProductVarietiesController', () => {
  let controller: ProductVarietiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductVarietiesController],
      providers: [ProductVarietiesService, DatabaseService, Logger, JwtService],
    }).compile();

    controller = module.get<ProductVarietiesController>(
      ProductVarietiesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
