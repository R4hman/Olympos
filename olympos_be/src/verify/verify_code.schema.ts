import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false, timestamps: true })
export class Verify {
  @Prop({ required: true })
  verify_code: number
  @Prop({ required: true })
  userEmail: string
  @Prop({ expires: 300 })
  createdAt: Date
}

export const VerifyModel = SchemaFactory.createForClass(Verify)
