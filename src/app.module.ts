import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './common/database/database.module';

@Module({
  imports: [ProductsModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
