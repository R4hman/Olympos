import { IsNotEmpty, IsOptional, Matches } from "class-validator";
import mongoose from "mongoose";

export class createReviewDto {

  @IsOptional()
  hotelId: mongoose.Schema.Types.ObjectId
  @IsOptional()
  tourId: mongoose.Schema.Types.ObjectId
  @IsNotEmpty()
  description: string
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  rating: number;

}


export class updateReviewDto {

  @IsOptional()
  hotelId: mongoose.Schema.Types.ObjectId
  @IsOptional()
  tourId: mongoose.Schema.Types.ObjectId
  @IsOptional()
  title: string;
  @IsOptional()
  description: string
  @IsOptional()
  rating: string

}

export class deleteReviewDto {

  @IsOptional()
  hotelId: mongoose.Schema.Types.ObjectId
  @IsOptional()
  tourId: mongoose.Schema.Types.ObjectId

}