import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    example: 'example@mail.com',
    description: 'The email of the user to sign in'
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;


  @ApiProperty({
    example: 'very-hard-password',
    description: 'The password of the user to sign in'
  })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(30)
  password: string;
}
