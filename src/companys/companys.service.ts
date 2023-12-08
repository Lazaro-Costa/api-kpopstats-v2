import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanysRepository } from './repositories/companys.repository';

@Injectable()
export class CompanysService {
  constructor(private readonly repository: CompanysRepository) {}
  create(createCompanyDto: CreateCompanyDto) {
    return this.repository.create(createCompanyDto);
  }

  async findAll(page: number) {
    return this.repository.findAll(page);
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return this.repository.update(id, updateCompanyDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
