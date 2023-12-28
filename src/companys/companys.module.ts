import { Module } from '@nestjs/common';
import { CompanysService } from './companys.service';
import { CompanysController } from './companys.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CompanysRepository } from './repositories/companys.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [CompanysController],
  providers: [CompanysService, PrismaService, CompanysRepository],
})
export class CompanysModule {}
