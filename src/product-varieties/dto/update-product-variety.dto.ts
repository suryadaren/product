import { PartialType } from '@nestjs/mapped-types';
import { CreateProductVarietyDto } from './create-product-variety.dto';

export class UpdateProductVarietyDto extends PartialType(CreateProductVarietyDto) {}
