import { Module } from '@nestjs/common';
import { IdolsService } from './idols.service';
import { IdolsController } from './idols.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { IdolsRepository } from './repositories/idols.repository';

@Module({
  controllers: [IdolsController],
  providers: [IdolsService, PrismaService, IdolsRepository],
})
export class IdolsModule {}
