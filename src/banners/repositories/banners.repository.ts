import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBannerDto } from '../dto/create-banner.dto';
import { UpdateBannerDto } from '../dto/update-banner.dto';
import { PicEntity } from 'src/pics/entities/pic.entity';

@Injectable()
export class BannersRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(createBannerDto: CreateBannerDto) {
    return this.prisma.banner.create({
      data: createBannerDto,
    });
  }

  async findAll() {
    return this.prisma.banner.findMany({
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

  async findAll_Entity(entity: string) {
    const groupsWithPictures = await this.prisma[entity].findMany({
      include: {
        pictures: {
          include: {
            banners: true,
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
    return this.prisma.banner.findUnique({
      where: { id },
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

  async update(id: number, updateBannerDto: UpdateBannerDto) {
    return this.prisma.banner.update({
      where: { id },
      data: updateBannerDto,
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
    return this.prisma.banner.delete({
      where: { id },
    });
  }
  async removeMany(ids: number[]) {
    return this.prisma.banner.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
