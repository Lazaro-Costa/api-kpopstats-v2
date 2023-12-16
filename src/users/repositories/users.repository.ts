import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '../dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class UsersRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<Omit<UserEntity, 'password'>> {
    const user = await this.prisma.user.create({
      data: {
        username: createUserDto.username,
        password: await bcrypt.hash(createUserDto.password, 12),
      },
    });
    delete user.password;
    return user;
  }

  async login(loginUserDto: LoginUserDto, res: Response) {
    const { username, password } = loginUserDto;
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      throw new BadRequestException('User not found or invalid credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('invalid credentials');
    }
    const jwt = await this.jwtService.signAsync({
      id: user.id,
      username: user.username,
    });

    res.cookie('jwt', jwt, { httpOnly: true });

    return {
      message: 'success',
    };
  }

  async user(res: Request) {
    try {
      const cookie = res.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);
      const user = await this.prisma.user.findUnique({
        where: {
          id: data['id'],
        },
      });
      delete user.password;
      return user;
    } catch (error) {
      throw new BadRequestException('Unauthenticated');
    }
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
