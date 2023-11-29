import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'src/common/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: env.JWT_SECRET,
      signOptions: {
        expiresIn: env.JWT_EXPIRED,
      },
    }),
  ],
})
export class AuthModule {}
