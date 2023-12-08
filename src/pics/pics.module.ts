import { Module } from '@nestjs/common';
import { PicsService } from './pics.service';
import { PicsController } from './pics.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PicsRepository } from './repositories/pics.repository';

@Module({
  controllers: [PicsController],
  providers: [PicsService, PrismaService, PicsRepository],
})
export class PicsModule {}
