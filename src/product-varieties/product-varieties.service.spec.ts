import { Test, TestingModule } from '@nestjs/testing';
import { ProductVarietiesService } from './product-varieties.service';

describe('ProductVarietiesService', () => {
  let service: ProductVarietiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductVarietiesService],
    }).compile();

    service = module.get<ProductVarietiesService>(ProductVarietiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
