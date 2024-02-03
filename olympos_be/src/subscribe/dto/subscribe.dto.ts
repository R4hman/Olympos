import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateSubscribeDto {
  @IsNotEmpty({ message: 'Email is empty' })
  @IsEmail()
  email: string
}
