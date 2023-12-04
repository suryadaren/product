import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './common/database/database.module';
import { ProductVarietiesModule } from './product-varieties/product-varieties.module';
import { ProductRatingsModule } from './product-ratings/product-ratings.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { SeedModule } from './seed/seed.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ProductsModule,
    DatabaseModule,
    ProductVarietiesModule,
    ProductRatingsModule,
    UsersModule,
    AuthModule,
    RolesModule,
    SeedModule,
    ThrottlerModule.forRoot([
      {
        // 100 request/minute
        ttl: 1 * 60 * 1000,
        limit: 100,
      },
    ]),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
