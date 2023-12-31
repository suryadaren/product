import { Logger, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { DatabaseModule } from 'src/common/database/database.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, Logger],
  imports: [DatabaseModule],
})
export class ProductsModule {}
