import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { GroupsRepository } from './repositories/groups.repository';
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
  controllers: [GroupsController],
  providers: [GroupsService, PrismaService, GroupsRepository],
})
export class GroupsModule {}
