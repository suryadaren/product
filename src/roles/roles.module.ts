import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { DatabaseModule } from 'src/common/database/database.module';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [DatabaseModule],
})
export class RolesModule {}
