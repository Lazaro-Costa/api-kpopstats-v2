import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { CompanyEntity } from '../entities/company.entity';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { BadRequestError } from 'src/common/erros/types/BadRequestError';
import { NotFoundError } from 'src/common/erros/types/NotFoundError';

@Injectable()
export class CompanysRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async create(
    createCompanyDto: CreateCompanyDto,
    req: Request,
  ): Promise<CompanyEntity> {
    try {
      const cookie = req.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new BadRequestError();
      }
      //Posteriormente adicionar Role e verificar se a role do usuário é admin ou moderador

      return this.prisma.company.create({
        data: createCompanyDto,
      });
    } catch (error) {
      throw new BadRequestError('Invalid Cookie or Unauthenticated');
    }
  }

  async findAll(page: number) {
    const itemsPerPage = 10;
    const skip = (page - 1) * itemsPerPage;

    return this.prisma.company.findMany({
      skip,
      take: itemsPerPage,
      include: {
        groups: {
          select: {
            id: true,
            name: true,
            fandom_name: true,
            idols: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        idols: {
          where: {
            solist: {
              not: false,
            },
          },
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
  async findAllV2() {
    return this.prisma.company.findMany({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        name: true,
        founding_date: true,
        headquarters: true,
        ceo: true,
        more_info: true,
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
    });
  }
  async findRelated(id: number, page: number) {
    const itemsPerPage = 10;
    const skip = (page - 1) * itemsPerPage;
    const company = await this.prisma.company.findUnique({
      where: {
        id,
      },
      select: {
        groups: {
          select: {
            fandom_name: true,
            name: true,
            id: true,
            companyId: true,
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
              select: {
                id: true,
                name: true,
                companyId: true,
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
      },
    });
    const solist = await this.prisma.company.findUnique({
      where: {
        id,
      },
      select: {
        idols: {
          skip,
          take: itemsPerPage,
          where: {
            solist: {
              not: false,
            },
          },
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (company && Array.isArray(solist) && solist.idols.length > 0) {
      return {
        ...company,
        solist,
      };
    } else if (company) {
      return company;
    }
  }
  async findOne(id: number) {
    try {
      const company = await this.prisma.company.findUnique({
        where: {
          id,
        },
        select: {
          name: true,
          id: true,
          ceo: true,
          headquarters: true,
          founding_date: true,
          more_info: true,
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
      if (!company) throw new NotFoundError();
      return company;
    } catch (error) {
      throw new NotFoundError('Company not found');
    }
  }
  async resume(page: number) {
    const itemsPerPage = 10;
    const skip = (page - 1) * itemsPerPage;

    return this.prisma.company.findMany({
      skip,
      take: itemsPerPage,
      select: {
        id: true,
        name: true,
        ceo: true,
        headquarters: true,
        founding_date: true,
        more_info: true,
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
    });
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto, req: Request) {
    try {
      const cookie = req.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new BadRequestError();
      }
      //Posteriormente adicionar Role e verificar se a role do usuário é admin ou moderador

      return this.prisma.company.update({
        where: {
          id,
        },
        data: updateCompanyDto,
      });
    } catch (e) {
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

      return this.prisma.company.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      throw new BadRequestError('Invalid Cookie or Unauthenticated');
    }
  }
}
