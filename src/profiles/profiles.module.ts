import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfilesRepository } from './repositories/profiles.repository';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService, PrismaService, ProfilesRepository],
})
export class ProfilesModule {}
