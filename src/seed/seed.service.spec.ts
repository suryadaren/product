import { Test, TestingModule } from '@nestjs/testing';
import { SeedService } from './seed.service';
import { DatabaseService } from 'src/common/database/database.service';
import { ProductRatingsService } from 'src/product-ratings/product-ratings.service';

describe('SeedService', () => {
  let service: SeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeedService, DatabaseService, ProductRatingsService],
    }).compile();

    service = module.get<SeedService>(SeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
