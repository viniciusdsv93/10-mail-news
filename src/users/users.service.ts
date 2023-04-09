import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReturnUserDto } from './dto/return-user.dto';
import { CreateUserDto } from './dto/create-users.dto';
import { randomUUID } from 'crypto';
import { User } from './entities/users.entity';
import { hash } from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) { }

  async getUserByEmail(email: string) {
    const foundUser = await this.prismaService.user.findUnique({
      where: {
        email
      }
    })

    return foundUser;
  }

  async getUsers() {
    const users = await this.prismaService.user.findMany();

    return users.map(user => {
      const { password, ...userData } = user;
      return userData;
    })
  }

  async getUserById(id: string) {
    const foundUser = await this.prismaService.user.findUnique({
      where: {
        id
      }
    })

    if (!foundUser) {
      throw new NotFoundException();
    }

    return new ReturnUserDto(foundUser);
  }

  async createUser(createUserDto: CreateUserDto) {
    const id = randomUUID();

    const { email, password } = createUserDto;

    const userAlreadyExists = await this.getUserByEmail(email);

    if (userAlreadyExists) {
      throw new BadRequestException('Email already in use');
    }

    const salt = 10;
    const passwordHash = await hash(password, salt);
    const newUser: User = new User(id, email, passwordHash);

    await this.prismaService.user.create({
      data: newUser
    })

    return new ReturnUserDto(newUser);
  }
}
