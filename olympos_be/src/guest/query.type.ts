import { IsOptional } from 'class-validator';
export class FilterDto {
  @IsOptional()
  country: string;
  @IsOptional()
  city: string;
  @IsOptional()
  maxPrice: number;
  @IsOptional()
  minPrice: number;
  @IsOptional()
  start_date: Date;
  @IsOptional()
  end_date: Date;
  @IsOptional()
  specifics: string
}


export class TourFilterDto{
  @IsOptional()
  name: string;
  @IsOptional()
  category: string;
  @IsOptional()
  minPrice: number;
  @IsOptional()
  maxPrice: number;
  @IsOptional()
  tour_day: number;
  @IsOptional()
  start_date: Date;
  @IsOptional()
  end_date: Date;
}
