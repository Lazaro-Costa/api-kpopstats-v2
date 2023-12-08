import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { GroupsRepository } from './repositories/groups.repository';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService, PrismaService, GroupsRepository],
})
export class GroupsModule {}
