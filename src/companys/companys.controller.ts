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
import { CompanysService } from './companys.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Request } from 'express';

@Controller('companys')
export class CompanysController {
  constructor(private readonly companysService: CompanysService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto, @Req() req: Request) {
    return this.companysService.create(createCompanyDto, req);
  }

  @Get()
  findAll(@Query('page') page = 1) {
    return this.companysService.findAll(+page);
  }

  @Get('related/:id')
  findRelated(@Param('id') id: string, @Query('page') page = 1) {
    return this.companysService.findRelated(+id, +page);
  }

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.companysService.findOne(+id);
  }

  @Get('resume')
  resume(@Query('page') page = 1) {
    return this.companysService.resume(page);
  }

  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @Req() req: Request,
  ) {
    return this.companysService.update(+id, updateCompanyDto, req);
  }

  @Delete('del/:id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.companysService.remove(+id, req);
  }
}
