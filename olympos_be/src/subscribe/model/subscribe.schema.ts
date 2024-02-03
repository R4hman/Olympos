import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true, versionKey: false })
export class Subscribe {
  @Prop({ required: true })
  email: string
}

export const subscribeModel = SchemaFactory.createForClass(Subscribe)