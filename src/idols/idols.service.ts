import { Injectable } from '@nestjs/common';
import { CreateIdolDto } from './dto/create-idol.dto';
import { UpdateIdolDto } from './dto/update-idol.dto';
import { IdolsRepository } from './repositories/idols.repository';

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

  update(id: number, updateIdolDto: UpdateIdolDto) {
    return this.repository.update(id, updateIdolDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
