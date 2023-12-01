import { PartialType } from '@nestjs/swagger';
import { CreateProductVarietyDto } from './create-product-variety.dto';

export class UpdateProductVarietyDto extends PartialType(
  CreateProductVarietyDto,
) {}
