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
import { IdolsService } from './idols.service';
import { CreateIdolDto } from './dto/create-idol.dto';
import { UpdateIdolDto } from './dto/update-idol.dto';
import { Request } from 'express';

@Controller('idols')
export class IdolsController {
  constructor(private readonly idolsService: IdolsService) {}

  @Post()
  create(@Body() createIdolDto: CreateIdolDto) {
    return this.idolsService.create(createIdolDto);
  }

  @Get()
  findAll(@Query('page') page = 1) {
    return this.idolsService.findAll(+page);
  }

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.idolsService.findOne(+id);
  }

  @Get('related/:id')
  findRelated(@Param('id') id: string) {
    return this.idolsService.findRelated(+id);
  }

  @Get('resume')
  resume(@Query('page') page = 1) {
    return this.idolsService.resume(page);
  }

  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateIdolDto: UpdateIdolDto,
    @Req() req: Request,
  ) {
    return this.idolsService.update(+id, updateIdolDto, req);
  }

  @Delete('del/:id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.idolsService.remove(+id, req);
  }
}
