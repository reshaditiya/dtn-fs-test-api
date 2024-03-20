import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RawData } from './raw_data.model';

@Injectable()
export class RawDataService {
  constructor(
    @InjectModel(RawData.name) private readonly rawDataModel: Model<RawData>,
  ) {}

  async insertRawData() {
    const rawData = new this.rawDataModel();
    rawData.resultTime = 'test';
    rawData.enodebId = 'test';
    rawData.cellId = 'test';
    rawData.availDur = 10;
    await rawData.save();

    return rawData;
  }
}
