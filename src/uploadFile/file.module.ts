import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesController } from './file.controller';
import { FilesService } from './file.service';
import { Files,FilesSchema } from './schemas/file.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Files.name, schema: FilesSchema }])],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
