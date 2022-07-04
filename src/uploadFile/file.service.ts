import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatefileDto } from './dto/create-file.dto';
import { Files, FileDocument } from './schemas/file.schema';

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(Files.name) private readonly FileModel: Model<FileDocument>,
  ) {}

  async create(CreateFileDto: CreatefileDto): Promise<Files> {
      const CreateFile = await this.FileModel.create(CreateFileDto);
      return CreateFile;
  
  }

  async findAll(): Promise<Files[]> {
    return this.FileModel.find().exec();
  }

  async findOne(name): Promise<Files> {
    return this.FileModel.findOne({uniqueId:name}).exec();
  }
}
