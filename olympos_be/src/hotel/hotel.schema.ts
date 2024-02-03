import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Hotel {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  location: string;
  @Prop({ required: true })
  country: string;
  @Prop({ required: true })
  city: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  start_date: Date;
  @Prop({ required: true })
  end_date: Date;
  @Prop({ required: true, ref: 'review' })
  reviews: [mongoose.Schema.Types.ObjectId];
  @Prop({ required: true })
  description: string;
  @Prop()
  photos: string[];
  @Prop({ required: true })
  map: string;
  @Prop()
  specifics: [string];

}

export const hotelModel = SchemaFactory.createForClass(Hotel);
