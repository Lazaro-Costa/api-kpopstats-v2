import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePicDto } from '../dto/create-pic.dto';
import { UpdatePicDto } from '../dto/update-pic.dto';
import { PicEntity } from '../entities/pic.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PicsRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPicDto: CreatePicDto): Promise<PicEntity> {
    const { name, urls_profile, urls_banner } = createPicDto;

    return this.prisma.pic.create({
      data: {
        name,
        profiles: {
          create: urls_profile?.map(url => ({ url })),
        },
        banners: {
          create: urls_banner?.map(url => ({ url })),
        },
      },
      include: {
        profiles: {
          select: {
            id: true,
            url: true,
          },
        },
        banners: {
          select: {
            id: true,
            url: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.pic.findMany({
      include: {
        profiles: {
          select: {
            id: true,
            url: true,
          },
        },
        banners: {
          select: {
            id: true,
            url: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.pic.findUnique({
      where: {
        id,
      },
      include: {
        profiles: {
          select: {
            id: true,
            url: true,
          },
        },
        banners: {
          select: {
            id: true,
            url: true,
          },
        },
      },
    });
  }

  async update(id: number, updatePicDto: UpdatePicDto) {
    return this.prisma.pic.update({
      where: {
        id,
      },
      data: {
        name: updatePicDto.name,
        profiles: {
          create: updatePicDto.urls_profile?.map(url => ({ url })),
        },
        banners: {
          create: updatePicDto.urls_banner?.map(url => ({ url })),
        },
      },
    });
  }

  async remove(id: number) {
    return this.prisma.pic.delete({
      where: {
        id,
      },
    });
  }
}
