import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupsRepository } from './repositories/groups.repository';
import { Request } from 'express';

@Injectable()
export class GroupsService {
  constructor(private readonly repository: GroupsRepository) {}
  create(createGroupDto: CreateGroupDto, req: Request) {
    return this.repository.create(createGroupDto, req);
  }

  findAll(page: number) {
    return this.repository.findAll(page);
  }

  findAllV2() {
    return this.repository.findAllV2();
  }

  findRelated(id: number) {
    return this.repository.findRelated(id);
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  resume(page: number) {
    return this.repository.resume(page);
  }

  update(id: number, updateGroupDto: UpdateGroupDto, req: Request) {
    return this.repository.update(id, updateGroupDto, req);
  }

  remove(id: number, req: Request) {
    return this.repository.remove(id, req);
  }
}
