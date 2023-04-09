import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'example@mail.com',
    description: 'The email of the new user'
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;


  @ApiProperty({
    example: 'very-hard-password',
    description: 'The password of the new user'
  })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(30)
  password: string;
}
