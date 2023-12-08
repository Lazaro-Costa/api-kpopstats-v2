import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesRepository } from './repositories/profiles.repository';

@Injectable()
export class ProfilesService {
  constructor(private readonly repository: ProfilesRepository) {}
  create(createProfileDto: CreateProfileDto) {
    return this.repository.create(createProfileDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  findAll_Group(entity: string) {
    return this.repository.findAll_Group(entity);
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return this.repository.update(id, updateProfileDto);
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
