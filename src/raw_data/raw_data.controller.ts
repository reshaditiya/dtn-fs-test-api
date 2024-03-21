import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RawDataService } from './raw_data.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('raw_data')
export class RawDataController {
  constructor(private readonly rawDataService: RawDataService) {}

  @Get()
  getGraph() {
    return 'a';
  }

  @Post()
  @UseInterceptors(FileInterceptor('files'))
  async uploadRawData(@UploadedFile() file: Express.Multer.File) {
    return this.rawDataService.insertRawData(file);
  }
}
