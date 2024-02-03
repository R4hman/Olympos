import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class HotelSpecific {
  @Prop({ required: true })
  name: string;
}
export const hotelSpecificModel = SchemaFactory.createForClass(HotelSpecific);
