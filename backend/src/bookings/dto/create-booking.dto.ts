import { IsString, IsInt, Min, IsDateString } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}
