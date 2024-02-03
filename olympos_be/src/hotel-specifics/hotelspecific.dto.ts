import { IsNotEmpty, IsString } from 'class-validator';

export class createHotelSpecificDto {
  @IsNotEmpty({ message: 'Name is empty' })
  @IsString({ message: 'You can not write a number' })
  name: string;
}
