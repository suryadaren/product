import { Logger, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/common/database/database.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, Logger],
  imports: [DatabaseModule],
})
export class UsersModule {}
