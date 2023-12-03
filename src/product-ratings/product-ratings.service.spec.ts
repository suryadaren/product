import { Test, TestingModule } from '@nestjs/testing';
import { ProductRatingsService } from './product-ratings.service';
import { DatabaseService } from 'src/common/database/database.service';

describe('ProductRatingsService', () => {
  let service: ProductRatingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductRatingsService, DatabaseService],
    }).compile();

    service = module.get<ProductRatingsService>(ProductRatingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
