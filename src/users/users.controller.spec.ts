import { BadRequestException, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-users.dto";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { Response } from "express";
import { PrismaService } from "../prisma/prisma.service";
import { randomUUID } from "crypto";

describe('Users Controller', () => {
  type sutTypes = {
    prismaService: PrismaService;
    usersController: UsersController;
    usersService: UsersService;
  }

  const makeSut = (): sutTypes => {
    let prismaService = new PrismaService();
    let usersService = new UsersService(prismaService);
    let usersController = new UsersController(usersService);

    return {
      prismaService, usersService, usersController
    }
  }

  //TODO use BeforeAll to populate database and do tests and AfterAll to delete them

  beforeAll(async () => {
    const { prismaService } = makeSut()

    await prismaService.user.deleteMany();

    await prismaService.user.create({
      data: {
        id: randomUUID(),
        email: "teste1@mail.com",
        password: "hashed-password1"
      }
    })

    await prismaService.user.create({
      data: {
        id: randomUUID(),
        email: "teste2@mail.com",
        password: "hashed-password2"
      }
    })
  })

  afterAll(async () => {
    const { prismaService } = makeSut()
    await prismaService.user.deleteMany();
  })

  describe('Find users', () => {
    it('should return an array of users', async () => {
      const { usersController } = makeSut();
      const result = await usersController.getUsers();
      expect(result instanceof Array).toBeTruthy();
      expect(result.length).toBe(2)
    })


    it('should return an user\'s ReturnDto data', async () => {
      const { usersController } = makeSut();
      const result = await usersController.getUsers()
      expect(result[0]).toHaveProperty("email")
      expect(result[0]).toHaveProperty("id")
    })


    it('should throw a not found error if user not exists', async () => {
      const { usersController } = makeSut();
      const promise = usersController.getUserById('5');
      await expect(promise).rejects.toThrowError(NotFoundException);
    })


    it('should throw a bad request error if email already exists on user creation', async () => {
      const { usersController } = makeSut();
      const createUserDto: CreateUserDto = {
        email: "teste1@mail.com",
        password: "password_test"
      }
      let response: Response;
      const promise = usersController.createUser(createUserDto, response);
      await expect(promise).rejects.toThrowError(BadRequestException);
    })
  })
})
