import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanysRepository } from './repositories/companys.repository';
import { Request } from 'express';

@Injectable()
export class CompanysService {
  constructor(private readonly repository: CompanysRepository) {}
  create(createCompanyDto: CreateCompanyDto, req: Request) {
    return this.repository.create(createCompanyDto, req);
  }

  findAll(page: number) {
    return this.repository.findAll(page);
  }

  findRelated(id: number, page: number) {
    return this.repository.findRelated(id, page);
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  resume(page: number) {
    return this.repository.resume(page);
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto, req: Request) {
    return this.repository.update(id, updateCompanyDto, req);
  }

  remove(id: number, req: Request) {
    return this.repository.remove(id, req);
  }
}
