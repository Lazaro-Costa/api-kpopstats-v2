import { Injectable } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { BannersRepository } from './repositories/banners.repository';

@Injectable()
export class BannersService {
  constructor(private readonly repository: BannersRepository) {}
  create(createBannerDto: CreateBannerDto) {
    return this.repository.create(createBannerDto);
  }

  findAll() {
    return this.repository.findAll();
  }
  findAll_Entity(entity: string) {
    return this.repository.findAll_Entity(entity);
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, updateBannerDto: UpdateBannerDto) {
    return this.repository.update(id, updateBannerDto);
  }

  remove(id: string) {
    const idsArray = id.split('-').map(Number);

    if (idsArray.length > 1) {
      return this.repository.removeMany(idsArray);
    } else {
      return this.repository.remove(+id);
    }
  }
}
