import { Module } from '@nestjs/common';
import { CompanysService } from './companys.service';
import { CompanysController } from './companys.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CompanysRepository } from './repositories/companys.repository';

@Module({
  controllers: [CompanysController],
  providers: [CompanysService, PrismaService, CompanysRepository],
})
export class CompanysModule {}
