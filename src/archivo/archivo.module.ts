import { Module } from '@nestjs/common';
import { ArchivoService } from './archivo.service';
import { ArchivoController } from './archivo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Archivo, ArchivoSchema } from './entities/archivo.entity';

@Module({
  controllers: [ArchivoController],
  providers: [ArchivoService],
  imports:[
    MongooseModule.forFeature([
      {
       name: Archivo.name,
       schema: ArchivoSchema 
      }
    ])
  ]
})
export class ArchivoModule {}
