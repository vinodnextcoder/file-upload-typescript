import {
  Body, Controller, Get, Post,
  UseFilters,
  UseInterceptors,
  UploadedFiles,
  Param,
  Res,
  StreamableFile
} from '@nestjs/common';
import { HttpExceptionFilter } from '../utils/errorHandle';
import { NotFoundInterceptor } from '../utils/errorNotFound';
import { FilesService } from './file.service';
import { CreatefileDto } from './dto/create-file.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { buildErrorResponse } from '../utils/erroBlock'
import { existsSync, createReadStream, createWriteStream } from 'fs';
import { buildErrorResponseRes } from '../utils/errorResBlock'
import path from 'path';
import { resolve } from 'path';
const { readFile, stat, writeFile } = require("fs/promises");
// var readFile = promisify(fs.readFile)
// var writeFile = promisify(fs.writeFile)
import Jimp from 'jimp/es';

@Controller('files')
export class FilesController {
  constructor(private readonly FilesService: FilesService) { }

  @Post()
  @UseFilters(new HttpExceptionFilter())
  async create(@Body() CreatefileDto: CreatefileDto) {
    let fileSave = await this.FilesService.create(CreatefileDto);
    console.log(fileSave);
    if (fileSave) {
      return {
        status: {
          code: 1000,
          header: 'Success',
          description: 'Record inserted'
        },
        data: null
      }
    }
  }

  @Get('find')
  @UseInterceptors(NotFoundInterceptor)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async findAll() {
    const responseData = await this.FilesService.findAll();
    if (responseData.length > 0) {
      return {
        status: {
          code: 1000,
          header: 'Success',
          description: 'Success'
        },
        data: responseData
      }
    }
    return buildErrorResponse(responseData);
  }




  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    // console.log(files);

    files.forEach(async file => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      let fileTypeList = file.originalname.split('.');
      let fileType = fileTypeList[fileTypeList.length - 1]
      let fileName = new Date().getTime().toString();
      let obj = {
        originalName: file.originalname,
        filedName: file.fieldname,
        fileType: fileType,
        size: file.size,
        uniqueId: fileName + '_' + file.originalname
      }
      await writeFile('./uploads/' + fileName + '_' + file.originalname, file.buffer, 'base64');
      let fileSave = await this.FilesService.create(obj);

    });

  }

  @Get(':imgpath/:name')
  async seeUploadedFile(@Param('imgpath') type: String, @Param('name') name: String, @Res() res) {
    try {

      const responseData = await this.FilesService.findOne(name);
      if (responseData) {
        console.log(responseData);
        let fileNameList = responseData.filedName.split(".");
        const fileName = fileNameList[0] + "." + type;
        const fileURL = resolve('./uploads/' + responseData.uniqueId);
        let fileCheck = existsSync(fileURL)
        if (!fileCheck) {
          return buildErrorResponseRes(res);
        }
        const stream = createReadStream(fileURL);
        res.set({
          'Content-Disposition': `attachment; filename='${fileName}'`,
          'Content-Type': `image/${type}`,
        });
        stream.pipe(res);
      }
      else {
        return buildErrorResponseRes(res);
      }
    } catch (error) {
      return buildErrorResponseRes(res);
    }

  }

}

