import { Module } from '@nestjs/common';
import { FilesController } from './file.controller';
import { FileService } from './file.service';

@Module({
  controllers: [FilesController],
  providers: [FileService],
})
export class FilesModule {}
