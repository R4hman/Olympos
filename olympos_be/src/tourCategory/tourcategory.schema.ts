import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class tourCategory {
  @Prop({ required: true })
  name: string;
}

export const tourCategoryModel = SchemaFactory.createForClass(tourCategory);
