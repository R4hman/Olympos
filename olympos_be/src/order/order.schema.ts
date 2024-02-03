import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  userId: Types.ObjectId;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'hotel' })
  hotelId: Types.ObjectId;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'tour' })
  tourId: Types.ObjectId;
  @Prop()
  confirmed_person_count: number;
  @Prop({ default: false })
  ordered: boolean;
}

export const orderModel = SchemaFactory.createForClass(Order);
