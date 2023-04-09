import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/users.entity';

export class ReturnUserDto {

  @ApiProperty({
    example: 'hjfjdshfkldshflsdkj',
    description: 'A random UUID authomatically generated to identify an user'
  })
  id: string;


  @ApiProperty({
    example: 'example@mail.com',
    description: 'The email of an user'
  })
  email: string;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
  }
}
