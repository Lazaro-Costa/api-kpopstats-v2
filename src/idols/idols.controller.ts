import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { IdolsService } from './idols.service';
import { CreateIdolDto } from './dto/create-idol.dto';
import { UpdateIdolDto } from './dto/update-idol.dto';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.idolsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIdolDto: UpdateIdolDto) {
    return this.idolsService.update(+id, updateIdolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.idolsService.remove(+id);
  }
}
