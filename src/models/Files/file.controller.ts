import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Res,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Express, Response } from 'express';

import { FileService } from './file.service';
import { FILE_STORE_BASE_NAME } from '../../common/constants';
import { editFileName, imageFileFilter } from '../../utils/fileUpload.utils';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly fileservice: FileService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: FILE_STORE_BASE_NAME,
      }),
    }),
  )
  async uploadedFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileservice.uploadSingleFile(file);
  }

  @Post('uploadMultipleFiles')
  @UseInterceptors(
    FilesInterceptor('file', 10, {
      storage: diskStorage({
        destination: FILE_STORE_BASE_NAME,
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
    return this.fileservice.uploadMultipleFile(files);
  }

  @Get(':file')
  getImage(@Param('file') file: string, @Res() res: Response) {
    return this.fileservice.getFile(file, res);
  }

  @Delete(':file')
  deleteFile(@Param('file') file: string, @Res() res: Response) {
    return this.fileservice.deleteFile(file, res);
  }
}
