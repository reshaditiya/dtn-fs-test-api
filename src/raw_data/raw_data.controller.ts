import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RawDataService } from './raw_data.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('raw-data')
export class RawDataController {
  constructor(private readonly rawDataService: RawDataService) {}

  @Get()
  getGraph(
    @Query('enodebId') enodebId: string,
    @Query('cellId') cellId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.rawDataService.getGraph({
      enodebId,
      cellId,
      startDate,
      endDate,
    });
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadRawData(@UploadedFile() file: Express.Multer.File) {
    return this.rawDataService.insertRawData(file);
  }
}
