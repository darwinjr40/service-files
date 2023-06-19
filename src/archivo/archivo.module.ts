
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { ArchivoService } from './archivo.service';
import { ArchivoController } from './archivo.controller';
import { Archivo, ArchivoSchema } from './entities/archivo.entity';


@Module({
  controllers: [ArchivoController],
  providers: [ArchivoService],
  imports:[
    ConfigModule,
    MongooseModule.forFeature([
      {
       name: Archivo.name,
       schema: ArchivoSchema 
      }
    ])
  ]
})
export class ArchivoModule {}
