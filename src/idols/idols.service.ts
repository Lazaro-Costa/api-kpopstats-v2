import { Injectable } from '@nestjs/common';
import { CreateIdolDto } from './dto/create-idol.dto';
import { UpdateIdolDto } from './dto/update-idol.dto';
import { IdolsRepository } from './repositories/idols.repository';
import { Request } from 'express';

@Injectable()
export class IdolsService {
  constructor(private readonly repository: IdolsRepository) {}
  create(createIdolDto: CreateIdolDto) {
    return this.repository.create(createIdolDto);
  }
  findAll(page: number) {
    return this.repository.findAll(page);
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }
  findRelated(id: number) {
    return this.repository.findRelated(id);
  }
  resume(page: number) {
    return this.repository.resume(page);
  }

  update(id: number, updateIdolDto: UpdateIdolDto, req: Request) {
    return this.repository.update(id, updateIdolDto, req);
  }

  remove(id: number, req: Request) {
    return this.repository.remove(id, req);
  }
}
