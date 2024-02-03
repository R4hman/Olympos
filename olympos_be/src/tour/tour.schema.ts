import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
@Schema({ versionKey: false, timestamps: true })
export class Tour {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true, ref: 'tourcategory' })
  category: mongoose.Schema.Types.ObjectId;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  hotel: string;
  @Prop({ required: true })
  nutrition: string;
  @Prop({ required: true })
  tour_date: Date;
  @Prop({ required: true })
  tour_day: number;
  @Prop({ required: true })
  person_count: number;
  @Prop({ default: 0 })
  confirmed_person_count: number;
  @Prop({ required: true })
  photo_shooting: string;
  @Prop({ required: true })
  description: string;
  @Prop()
  photo: string;
  @Prop({ required: true, ref: 'review' })
  reviews: [mongoose.Schema.Types.ObjectId];
}

export const tourModel = SchemaFactory.createForClass(Tour);
