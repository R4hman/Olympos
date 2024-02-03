import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class User {
  @Prop({ required: true })
  first_name: string;
  @Prop({ required: true })
  last_name: string;
  @Prop({ unique: true, required: true })
  email: string;
  @Prop({ required: true })
  phone_number: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true, ref: 'order' })
  user_orders: [mongoose.Schema.Types.ObjectId];
  @Prop({ required: true, ref: 'whishlist' })
  user_whishlist: [mongoose.Schema.Types.ObjectId];
  @Prop()
  profile_photo: string;
  @Prop({ default: 'user' })
  role: string;
}

export const userModel = SchemaFactory.createForClass(User);
