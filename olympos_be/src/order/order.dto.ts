import { IsInt, IsNotEmpty, IsOptional } from "class-validator";
import mongoose from "mongoose";

export class CreateOrderDto {
  @IsOptional()
  hotelId: mongoose.Schema.Types.ObjectId;
  @IsOptional()
  tourId: mongoose.Schema.Types.ObjectId;
  @IsNotEmpty()
  confirmed_person_count: number;
}


export class UpdateOrderDto {
  @IsInt()
  confirmed_person_count: number;
}
