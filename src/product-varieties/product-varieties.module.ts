import { Logger, Module } from '@nestjs/common';
import { ProductVarietiesService } from './product-varieties.service';
import { ProductVarietiesController } from './product-varieties.controller';
import { DatabaseModule } from 'src/common/database/database.module';

@Module({
  controllers: [ProductVarietiesController],
  providers: [ProductVarietiesService, Logger],
  imports: [DatabaseModule],
})
export class ProductVarietiesModule {}
