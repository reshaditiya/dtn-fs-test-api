import { Controller, Get, Post } from '@nestjs/common';
import { RawDataService } from './raw_data.service';

@Controller('raw_data')
export class RawDataController {
  constructor(private readonly rawDataService: RawDataService) {}

  @Get()
  getGraph() {
    return this.rawDataService.insertRawData();
  }

  @Post()
  uploadRawData() {
    return 'tes';
  }
}
