import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './common/database/database.module';
import { ProductVarietiesModule } from './product-varieties/product-varieties.module';
import { ProductRatingsModule } from './product-ratings/product-ratings.module';

@Module({
  imports: [
    ProductsModule,
    DatabaseModule,
    ProductVarietiesModule,
    ProductRatingsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
