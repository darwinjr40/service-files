import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UploadedFile, UseInterceptors, BadRequestException, Query } from '@nestjs/common';
import { ArchivoService } from './archivo.service';
import { CreateArchivoDto } from './dto/create-archivo.dto';
import { UpdateArchivoDto } from './dto/update-archivo.dto';
import { FilesController } from 'src/files/files.controller';
import { write } from 'fs';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, fileNamer } from 'src/files/helpers';
import { diskStorage } from 'multer';
import { ConfigService } from '@nestjs/config';

@Controller('archivo')
export class ArchivoController {
  constructor(
    private readonly archivoService: ArchivoService,
    private readonly configService: ConfigService,
    ) {}

  @Post()
  @UseInterceptors( FileInterceptor('file', {
    fileFilter: fileFilter,
    // limits: { fileSize: 1000 }
    storage: diskStorage({
      destination: './static/products',
      filename: fileNamer
    })
  }) )
  create(
    @Body() createArchivoDto:any,
    @UploadedFile() file: Express.Multer.File
  ) {
    if ( !file ) {
      throw new BadRequestException('Make sure that the file is an image');
    }        
    const url = `${ this.configService.get('HOST_API') }/files/product/${ file.filename }`;
    createArchivoDto.url = url;
    return this.archivoService.create(createArchivoDto);
  }

  @Get()
  findAll() {
    return this.archivoService.findAll();
  }


  @Get('get-files/:term')
  getFiles( @Param('term') term: string ) {
    return this.archivoService.getFiles(term);
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
