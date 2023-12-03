import { Test, TestingModule } from '@nestjs/testing';
import { SeedController } from './seed.controller';
import { DatabaseService } from 'src/common/database/database.service';
import { JwtService } from '@nestjs/jwt';
import { SeedService } from './seed.service';
import { ProductRatingsService } from 'src/product-ratings/product-ratings.service';
import { Logger } from '@nestjs/common';

describe('SeedController', () => {
  let controller: SeedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeedController],
      providers: [
        SeedService,
        DatabaseService,
        Logger,
        JwtService,
        ProductRatingsService,
      ],
    }).compile();

    controller = module.get<SeedController>(SeedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
