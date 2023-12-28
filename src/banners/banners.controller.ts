import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BannersService } from './banners.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

@Controller('banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Post()
  create(@Body() createBannerDto: CreateBannerDto) {
    return this.bannersService.create(createBannerDto);
  }

  @Get()
  findAll() {
    return this.bannersService.findAll();
  }
  @Get('/entity/:entity')
  findAll_Entity(@Param('entity') entity: string) {
    return this.bannersService.findAll_Entity(entity);
  }

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.bannersService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateBannerDto: UpdateBannerDto) {
    return this.bannersService.update(+id, updateBannerDto);
  }

  @Delete('del/:id')
  remove(@Param('id') id: string) {
    return this.bannersService.remove(id);
  }
}
