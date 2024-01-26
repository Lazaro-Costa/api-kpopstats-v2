import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Request } from 'express';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto, @Req() req: Request) {
    return this.groupsService.create(createGroupDto, req);
  }

  @Get()
  findAll(@Query('page') page = 1) {
    return this.groupsService.findAll(+page);
  }
  @Get('all')
  findAllV2() {
    return this.groupsService.findAllV2();
  }

  @Get('related/:id')
  findRelated(@Param('id') id: string) {
    return this.groupsService.findRelated(+id);
  }

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(+id);
  }

  @Get('resume')
  resume(@Query('page') page = 1) {
    return this.groupsService.resume(page);
  }

  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
    @Req() req: Request,
  ) {
    return this.groupsService.update(+id, updateGroupDto, req);
  }

  @Delete('del/:id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.groupsService.remove(+id, req);
  }
}
