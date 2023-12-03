import { Logger, Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { DatabaseModule } from 'src/common/database/database.module';
import { ProductRatingsModule } from 'src/product-ratings/product-ratings.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService, Logger],
  imports: [DatabaseModule, ProductRatingsModule],
})
export class SeedModule {}
