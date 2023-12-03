import { Logger, Module } from '@nestjs/common';
import { ProductRatingsService } from './product-ratings.service';
import { ProductRatingsController } from './product-ratings.controller';
import { DatabaseModule } from 'src/common/database/database.module';

@Module({
  controllers: [ProductRatingsController],
  providers: [ProductRatingsService, Logger],
  imports: [DatabaseModule],
  exports: [ProductRatingsService],
})
export class ProductRatingsModule {}
