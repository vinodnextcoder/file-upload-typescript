import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type FileDocument = Files & Document;


@Schema()
export class Files {

  @Prop()
  filedName: string;
    
  @Prop()
  originalName: string;

  @Prop()
  size: number;
  
  @Prop()
  fileType: string;

  @Prop()
  uniqueId: string;
}

export const FilesSchema = SchemaFactory.createForClass(Files);
