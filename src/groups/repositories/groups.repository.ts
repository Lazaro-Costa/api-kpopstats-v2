import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { BadRequestError } from 'src/common/erros/types/BadRequestError';
import { NotFoundError } from 'src/common/erros/types/NotFoundError';

@Injectable()
export class GroupsRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async create(createGroupDto: CreateGroupDto, req: Request) {
    try {
      const cookie = req.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new BadRequestError();
      }
      //Posteriormente adicionar Role e verificar se a role do usuário é admin ou moderador

      return this.prisma.group.create({
        data: createGroupDto,
        include: {
          company: {
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

    return this.prisma.group.findMany({
      skip,
      take: itemsPerPage,
      include: {
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
        idols: {
          include: {
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
    });
  }

  async findAllV2() {
    return this.prisma.group.findMany({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        name: true,
        fandom_name: true,
        debut_date: true,
        more_info: true,
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
        idols: {
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
    });
  }
  async findRelated(id: number) {
    return this.prisma.group.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        fandom_name: true,
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
        idols: {
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
    });
  }

  async findOne(id: number) {
    try {
      const group = await this.prisma.group.findUnique({
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
            include: {
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
      });
      if (!group) {
        throw new NotFoundError();
      }
      return group;
    } catch (error) {
      throw new NotFoundError('Group not found!');
    }
  }
  async resume(page: number) {
    const itemsPerPage = 10;
    const skip = (page - 1) * itemsPerPage;
    return this.prisma.group.findMany({
      skip,
      take: itemsPerPage,
      select: {
        id: true,
        name: true,
        debut_date: true,
        fandom_name: true,
        more_info: true,
        companyId: true,
        picsId: true,
        company: {
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

  async update(id: number, updateGroupDto: UpdateGroupDto, req: Request) {
    try {
      const cookie = req.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new BadRequestError();
      }
      //Posteriormente adicionar Role e verificar se a role do usuário é admin ou moderador

      return this.prisma.group.update({
        where: {
          id,
        },
        data: updateGroupDto,
        include: {
          company: {
            select: {
              id: true,
              name: true,
            },
          },
          idols: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    } catch (err) {
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
      //Posteriormente adicionar Role e verificar se a role do usuário é admin ou moderador

      return this.prisma.group.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      throw new BadRequestError('Invalid Cookie or Unauthenticated');
    }
  }
}
