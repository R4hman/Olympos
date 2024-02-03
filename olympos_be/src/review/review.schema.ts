import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Review {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  userId: Types.ObjectId;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'hotel' })
  hotelId: Types.ObjectId;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'tour' })
  tourId: Types.ObjectId;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  rating: number;
}

export const reviewModel = SchemaFactory.createForClass(Review);

