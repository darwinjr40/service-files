import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Archivo extends Document{

    @Prop({
        unique: true,
        index: true,
    })
    url: string;

    @Prop({
        // unique: true,
        index: true,
    })
    foreign_id: number;
}

export const ArchivoSchema = SchemaFactory.createForClass(Archivo);