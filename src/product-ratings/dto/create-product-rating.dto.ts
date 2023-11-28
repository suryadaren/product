import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class CreateProductRatingDto {
  @IsNumber()
  @IsNotEmpty()
  product_id: number;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  value: number;
}
