import { IsNotEmpty, Matches } from 'class-validator';

export class updateTourCategoryDto {
  @IsNotEmpty({ message: 'Cannot be kept empty' })
  @Matches(new RegExp('^[A-Za-z əüöğıçşƏÜÖĞİIÇŞ]{3,40}$'))
  name: string;
}

