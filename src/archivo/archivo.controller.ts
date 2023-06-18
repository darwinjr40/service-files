import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArchivoService } from './archivo.service';
import { CreateArchivoDto } from './dto/create-archivo.dto';
import { UpdateArchivoDto } from './dto/update-archivo.dto';

@Controller('archivo')
export class ArchivoController {
  constructor(private readonly archivoService: ArchivoService) {}

  @Post()
  create(@Body() createArchivoDto: CreateArchivoDto) {
    return this.archivoService.create(createArchivoDto);
  }

  @Get()
  findAll() {
    return this.archivoService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.archivoService.findOne(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updateArchivoDto: UpdateArchivoDto) {
    return this.archivoService.update(term, updateArchivoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.archivoService.remove(id);
  }
}
