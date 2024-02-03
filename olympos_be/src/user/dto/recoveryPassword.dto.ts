import { IsNotEmpty, Length } from "class-validator";

export class recoveryPasswordDto {

  @IsNotEmpty()
  @Length(8, 16)
  password: string;

  @IsNotEmpty()
  @Length(8, 16)
  repeat_password: string;

}
