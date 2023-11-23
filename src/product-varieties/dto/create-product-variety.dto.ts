import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductVarietyDto {
  @IsNumber()
  @IsNotEmpty()
  product_id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
