import { Injectable } from '@nestjs/common';
import { Express, Response } from 'express';
import { existsSync, unlink } from 'fs';

import { handleSuccess, handleError } from '../../common/helpers';
import { FILE_STORE_BASE_NAME } from '../../common/constants';

@Injectable()
export class FileService {
  constructor() {}

  uploadSingleFile(file: Express.Multer.File) {
    if (file) {
      return handleSuccess({ file: file.filename });
    } else {
      return handleError('File cannot be null');
    }
  }

  uploadMultipleFile(files: Express.Multer.File[]) {
    try {
      const response = [];
      files.forEach((file) => {
        const fileReponse = {
          originalname: file.originalname,
          filename: file.filename,
        };
        response.push(fileReponse);
      });
      return handleSuccess({ files: response });
    } catch (e) {
      return handleError(e.message);
    }
  }

  getFile(file: string, res: Response) {
    try {
      if (existsSync(FILE_STORE_BASE_NAME + '/' + file)) {
        return res.sendFile(file, { root: FILE_STORE_BASE_NAME });
      } else {
        return res.json(handleError('File not exists'));
      }
    } catch (e) {
      return handleError(e.message);
    }
  }

  deleteFile(file: string, res: Response) {
    try {
      if (existsSync(FILE_STORE_BASE_NAME + '/' + file)) {
        unlink(FILE_STORE_BASE_NAME + '/' + file, (err) => {
          if (err) return res.json(handleError('File not exists'));
          else {
            return res.json(handleSuccess('File deleted'));
          }
        });
      } else {
        return res.json(handleError('File not exists'));
      }
    } catch (e) {
      return res.json(handleError(e.message));
    }
  }
}
