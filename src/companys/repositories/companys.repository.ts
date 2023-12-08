import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { CompanyEntity } from '../entities/company.entity';

@Injectable()
export class CompanysRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(createCompanyDto: CreateCompanyDto): Promise<CompanyEntity> {
    return this.prisma.company.create({
      data: createCompanyDto,
    });
  }

  async findAll(page: number) {
    const itemsPerPage = 3;
    const skip = (page - 1) * itemsPerPage;

    return this.prisma.company.findMany({
      skip,
      take: itemsPerPage,
      include: {
        groups: {
          select: {
            id: true,
            name: true,
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

  async findOne(id: number) {
    return this.prisma.company.findUnique({
      where: {
        id,
      },
      include: {
        groups: {
          select: {
            id: true,
            name: true,
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

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return this.prisma.company.update({
      where: {
        id,
      },
      data: updateCompanyDto,
    });
  }

  async remove(id: number) {
    return this.prisma.company.delete({
      where: {
        id,
      },
    });
  }
}
