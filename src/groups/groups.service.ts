import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupsRepository } from './repositories/groups.repository';

@Injectable()
export class GroupsService {
  constructor(private readonly repository: GroupsRepository) {}
  create(createGroupDto: CreateGroupDto) {
    return this.repository.create(createGroupDto);
  }

  findAll(page: number) {
    return this.repository.findAll(page);
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return this.repository.update(id, updateGroupDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
