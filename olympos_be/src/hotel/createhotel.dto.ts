import { IsNotEmpty, Matches } from 'class-validator';

export class createHotelDto {
  @IsNotEmpty()
  @Matches(new RegExp('^[A-Za-z0-9 əüöğıçşƏÜÖĞIÇŞ*-]{3,100}$'))
  name: string;
  @IsNotEmpty()
  @Matches(new RegExp('^[A-Za-z0-9əüöğıçşƏÜÖĞIÇŞ,./ :]{20,150}$'))
  location: string;
  @IsNotEmpty()
  @Matches(new RegExp('^[A-Za-z,əüöğıçşƏÜÖĞIÇŞ -]{3,50}$'))
  country: string;
  @IsNotEmpty()
  @Matches(new RegExp('^[A-Za-z,əüöğıçşƏÜÖĞIÇŞ -]{3,50}$'))
  city: string;
  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  start_date: Date;
  @IsNotEmpty()
  end_date: Date;
  reviews: [string];
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  map: string;
  specifics: string[];
  // @IsNotEmpty()
  // breakfast: boolean;
  // @IsNotEmpty()
  // parking: boolean;
  // @IsNotEmpty()
  // pool: boolean;
  // @IsNotEmpty()
  // wifi: boolean;
  // @IsNotEmpty()
  // air_conditioning: boolean;
  // @IsNotEmpty()
  // entertainment: boolean;
}
