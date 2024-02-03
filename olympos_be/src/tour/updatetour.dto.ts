import { IsNotEmpty, Matches } from 'class-validator';
import mongoose from 'mongoose';

export class updateTourDto {
  @IsNotEmpty()
  @Matches(new RegExp('^[A-Za-z0-9 əüöğıçşƏÜÖĞİIÇŞ,-]{3,100}$'))
  name: string;
  @IsNotEmpty()
  category: mongoose.Schema.Types.ObjectId;
  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  hotel: string; // Daxildir,daxil deyil,səhər yeməyi, full paket
  @IsNotEmpty()
  nutrition: string; //daxildir ve ya daxil deyil
  @IsNotEmpty()
  tour_date: Date;
  @IsNotEmpty()
  tour_day: number;
  @IsNotEmpty()
  person_count: number;
  @IsNotEmpty()
  photo_shooting: string; //Daxildir ve ya daxil deyil
  @IsNotEmpty()
  description: string;
}
