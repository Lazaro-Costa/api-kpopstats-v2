import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PicsService } from './pics.service';
import { CreatePicDto } from './dto/create-pic.dto';
import { UpdatePicDto } from './dto/update-pic.dto';

@Controller('pics')
export class PicsController {
  constructor(private readonly picsService: PicsService) {}

  @Post()
  create(@Body() createPicDto: CreatePicDto) {
    return this.picsService.create(createPicDto);
  }

  @Get()
  findAll() {
    return this.picsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.picsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePicDto: UpdatePicDto) {
    return this.picsService.update(+id, updatePicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.picsService.remove(+id);
  }
}
