import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Archivo } from './entities/archivo.entity';

import { CreateArchivoDto } from './dto/create-archivo.dto';
import { UpdateArchivoDto } from './dto/update-archivo.dto';

@Injectable()
export class ArchivoService {

  constructor(
    @InjectModel(Archivo.name)
    private readonly archivoModel: Model<Archivo>
  ){}

  async create(createArchivoDto: CreateArchivoDto) {
    try {
      const archivo = await this.archivoModel.create(createArchivoDto);
      return archivo;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    const archivos = await this.archivoModel.find().exec();
    return archivos;
  }

  async getFiles(term: string) {
    let archivos: Archivo[];
    if ( !isNaN(+term) ) {
      archivos = await this.archivoModel.find({ foreign_id: term }).exec();
    }
    // MongoID
    if ( !archivos && isValidObjectId( term ) ) {
      archivos = [await this.archivoModel.findById( term )];
    }
    // Name
    if ( !archivos ) {
      archivos = await this.archivoModel.find({ url: term}).exec();
    }

    if ( !archivos ) 
      throw new NotFoundException(`archivo with id, name or no "${ term }" not found`);
    
    return archivos;
  }

  async findOne(term: string) {
    let archivo: Archivo;
    if ( !isNaN(+term) ) {
      archivo = await this.archivoModel.findOne({ foreign_id: term });
    }
    // MongoID
    if ( !archivo && isValidObjectId( term ) ) {
      archivo = await this.archivoModel.findById( term );
    }

    // Name
    if ( !archivo ) {
      archivo = await this.archivoModel.findOne({ url: term})
    }

    if ( !archivo ) 
      throw new NotFoundException(`archivo with id, name or no "${ term }" not found`);
    
    return archivo;
  }

  async update(term: string, updateArchivoDto: UpdateArchivoDto) {
    const archivo = await this.findOne( term );
    // if ( updateArchivoDto.url )
    //   updateArchivoDto.url = updateArchivoDto.url.toLowerCase();
    
    try {
      await archivo.updateOne( updateArchivoDto );
      return { ...archivo.toJSON(), ...updateArchivoDto };
      
    } catch (error) {
      this.handleExceptions( error );
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.archivoModel.deleteOne({ _id: id });
    if ( deletedCount === 0 )
      throw new BadRequestException(`Archivo with id "${ id }" not found`);

    return;
  }


  
  private handleExceptions( error: any ) {
    if ( error.code === 11000 ) {
      throw new BadRequestException(`Archivo exists in db ${ JSON.stringify( error.keyValue ) }`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create Archivo - Check server logs`);
  }
}
