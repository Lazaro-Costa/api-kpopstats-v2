import { Module } from '@nestjs/common';
import { BannersService } from './banners.service';
import { BannersController } from './banners.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { BannersRepository } from './repositories/banners.repository';

@Module({
  controllers: [BannersController],
  providers: [BannersService, PrismaService, BannersRepository],
})
export class BannersModule {}
