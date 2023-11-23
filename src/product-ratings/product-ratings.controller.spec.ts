import { Test, TestingModule } from '@nestjs/testing';
import { RatingsController } from './product-ratings.controller';
import { RatingsService } from './product-ratings.service';

describe('ProductRatingsController', () => {
  let controller: RatingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RatingsController],
      providers: [RatingsService],
    }).compile();

    controller = module.get<RatingsController>(RatingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
