import { Injectable } from '@nestjs/common';
import { CreatePicDto } from './dto/create-pic.dto';
import { UpdatePicDto } from './dto/update-pic.dto';
import { PicsRepository } from './repositories/pics.repository';

@Injectable()
export class PicsService {
  constructor(private readonly repository: PicsRepository) {}
  create(createPicDto: CreatePicDto) {
    return this.repository.create(createPicDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, updatePicDto: UpdatePicDto) {
    return this.repository.update(id, updatePicDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
