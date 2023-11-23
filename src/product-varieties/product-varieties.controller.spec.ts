import { Test, TestingModule } from '@nestjs/testing';
import { ProductVarietiesController } from './product-varieties.controller';
import { ProductVarietiesService } from './product-varieties.service';

describe('ProductVarietiesController', () => {
  let controller: ProductVarietiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductVarietiesController],
      providers: [ProductVarietiesService],
    }).compile();

    controller = module.get<ProductVarietiesController>(ProductVarietiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
