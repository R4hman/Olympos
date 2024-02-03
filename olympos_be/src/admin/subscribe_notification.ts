import { IsNotEmpty } from 'class-validator';

export class notificationSubscribesDto {
  @IsNotEmpty({ message: 'Email is empty' })
  text: string;
  @IsNotEmpty({ message: 'Subject is empty' })

  subject: string
}


