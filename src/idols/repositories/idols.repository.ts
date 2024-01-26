import { PrismaService } from 'src/prisma/prisma.service';
import { CreateIdolDto } from '../dto/create-idol.dto';
import { UpdateIdolDto } from '../dto/update-idol.dto';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { NotFoundError } from 'src/common/erros/types/NotFoundError';
import { BadRequestError } from 'src/common/erros/types/BadRequestError';

@Injectable()
export class IdolsRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createIdolDto: CreateIdolDto, req: Request) {
    try {
      const cookie = req.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new BadRequestError();
      }
      //Posteriormente adicionar Role e verificar se a role do usuário é admin ou moderador

      return this.prisma.idol.create({
        data: createIdolDto,
        include: {
          company: {
            select: {
              id: true,
              name: true,
            },
          },
          group: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    } catch (error) {
      throw new BadRequestError('Invalid Cookie or Unauthenticated');
    }
  }

  async findAll(page: number) {
    const itemsPerPage = 10;
    const skip = (page - 1) * itemsPerPage;
    return this.prisma.idol.findMany({
      skip,
      take: itemsPerPage,
      include: {
        company: {
          select: {
            id: true,
            name: true,
          },
        },
        group: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findallV2() {
    return this.prisma.idol.findMany({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        name: true,
        korean_name: true,
        foreign_name: true,
        nationality: true,
        date_birth: true,
        solist: true,
        more_info: true,
        companyId: true,
        groupId: true,
        picsId: true,
        company: {
          select: {
            id: true,
            name: true,
          },
        },
        group: {
          select: {
            id: true,
            name: true,
          },
        },
        pictures: {
          select: {
            id: true,
            name: true,
            banners: {
              select: {
                id: true,
                url: true,
              },
            },
            profiles: {
              select: {
                id: true,
                url: true,
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: number) {
    try {
      const idol = await this.prisma.idol.findUnique({
        where: {
          id,
        },
        include: {
          company: {
            select: {
              id: true,
              name: true,
            },
          },
          group: {
            select: {
              id: true,
              name: true,
            },
          },
          pictures: {
            select: {
              id: true,
              name: true,
              banners: {
                select: {
                  id: true,
                  url: true,
                },
              },
              profiles: {
                select: {
                  id: true,
                  url: true,
                },
              },
            },
          },
        },
      });
      if (!idol) {
        throw new NotFoundError();
      }
      return idol;
    } catch (error) {
      throw new NotFoundError('Idol not found');
    }
  }

  async findRelated(id: number) {
    return this.prisma.idol.findUnique({
      where: {
        id,
      },
      select: {
        company: {
          select: {
            id: true,
            name: true,
            ceo: true,
            headquarters: true,
            pictures: {
              select: {
                id: true,
                name: true,
                banners: {
                  select: {
                    id: true,
                    url: true,
                  },
                },
                profiles: {
                  select: {
                    id: true,
                    url: true,
                  },
                },
              },
            },
          },
        },
        group: {
          select: {
            id: true,
            name: true,
            fandom_name: true,
            pictures: {
              select: {
                id: true,
                name: true,
                banners: {
                  select: {
                    id: true,
                    url: true,
                  },
                },
                profiles: {
                  select: {
                    id: true,
                    url: true,
                  },
                },
              },
            },
            idols: {
              where: {
                id: {
                  not: id,
                },
              },
              select: {
                id: true,
                name: true,
                pictures: {
                  select: {
                    id: true,
                    name: true,
                    banners: {
                      select: {
                        id: true,
                        url: true,
                      },
                    },
                    profiles: {
                      select: {
                        id: true,
                        url: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        solist: true,
      },
    });
  }

  async resume(page: number) {
    const itemsPerPage = 10;
    const skip = (page - 1) * itemsPerPage;
    return this.prisma.idol.findMany({
      skip,
      take: itemsPerPage,
      select: {
        id: true,
        name: true,
        nationality: true,
        date_birth: true,
        foreign_name: true,
        korean_name: true,
        more_info: true,
        solist: true,
        groupId: true,
        companyId: true,
        picsId: true,
        pictures: {
          select: {
            id: true,
            name: true,
            banners: {
              select: {
                id: true,
                url: true,
              },
            },
            profiles: {
              select: {
                id: true,
                url: true,
              },
            },
          },
        },
        company: {
          select: {
            id: true,
            name: true,
          },
        },
        group: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async update(id: number, updateIdolDto: UpdateIdolDto, req: Request) {
    try {
      const cookie = req.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new BadRequestError();
      }
      //Posteriormente adicionar Role e verificar se a role do usuário é admin ou moderador

      return this.prisma.idol.update({
        where: {
          id,
        },
        data: updateIdolDto,
      });
    } catch (error) {
      throw new BadRequestError('Invalid Cookie or Unauthenticated');
    }
  }

  async remove(id: number, req: Request) {
    try {
      const cookie = req.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new BadRequestError();
      }

      return this.prisma.idol.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new BadRequestError('Invalid Cookie or Unauthenticated');
    }
  }
}
