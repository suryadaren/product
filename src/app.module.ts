import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './common/database/database.module';
import { ProductVarietiesModule } from './product-varieties/product-varieties.module';
import { ProductRatingsModule } from './product-ratings/product-ratings.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ProductsModule,
    DatabaseModule,
    ProductVarietiesModule,
    ProductRatingsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
