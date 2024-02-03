import { IsOptional } from 'class-validator';
import mongoose from 'mongoose';

export class deleteWhishListDto {
  @IsOptional()
  hotelId: mongoose.Schema.Types.ObjectId;
  @IsOptional()
  tourId: mongoose.Schema.Types.ObjectId;
}