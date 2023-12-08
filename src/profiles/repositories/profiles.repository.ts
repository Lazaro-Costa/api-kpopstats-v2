import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { ProfileEntity } from '../entities/profile.entity';
import { GroupWithPictures } from 'src/interfaces/Profiles.interface';
import { PicEntity } from 'src/pics/entities/pic.entity';

@Injectable()
export class ProfilesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProfileDto: CreateProfileDto) {
    return this.prisma.profile.create({
      data: createProfileDto,
      include: {
        Pic: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findAll(): Promise<ProfileEntity[]> {
    return this.prisma.profile.findMany({
      include: {
        Pic: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
  async findAll_Group(entity: string): Promise<PicEntity[]> {
    const groupsWithPictures: GroupWithPictures[] = await this.prisma[
      entity
    ].findMany({
      include: {
        pictures: {
          include: {
            profiles: true,
          },
        },
      },
    });
    // Mapear para obter apenas os perfis
    const profiles: PicEntity[] = groupsWithPictures.flatMap(
      group => group.pictures,
    );
    return profiles;
  }

  async findOne(id: number) {
    return this.prisma.profile.findUnique({
      where: {
        id,
      },
      include: {
        Pic: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    return this.prisma.profile.update({
      where: {
        id,
      },
      data: updateProfileDto,
      include: {
        Pic: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    return this.prisma.profile.delete({
      where: {
        id,
      },
    });
  }
  async removeMany(ids: number[]) {
    return this.prisma.profile.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
