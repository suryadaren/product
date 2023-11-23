import { Test, TestingModule } from '@nestjs/testing';
import { RatingsService } from './product-ratings.service';

describe('ProductRatingsService', () => {
  let service: RatingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RatingsService],
    }).compile();

    service = module.get<RatingsService>(RatingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
