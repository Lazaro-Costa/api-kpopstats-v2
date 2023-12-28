import { Module } from '@nestjs/common';
import { IdolsService } from './idols.service';
import { IdolsController } from './idols.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { IdolsRepository } from './repositories/idols.repository';
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
  controllers: [IdolsController],
  providers: [IdolsService, PrismaService, IdolsRepository],
})
export class IdolsModule {}
