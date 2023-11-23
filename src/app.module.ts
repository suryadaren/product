import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './common/database/database.module';
import { ProductVarietiesModule } from './product-varieties/product-varieties.module';

@Module({
  imports: [ProductsModule, DatabaseModule, ProductVarietiesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
