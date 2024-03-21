import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RawData } from './raw_data.model';
import { parse } from 'csv-parse';
import { Readable } from 'stream';
import * as moment from 'moment';

@Injectable()
export class RawDataService {
  constructor(
    @InjectModel(RawData.name) private readonly rawDataModel: Model<RawData>,
  ) {}

  private parseStringToObject(str: string) {
    const pairs = str.split(', ');
    const obj = {};

    pairs?.forEach((pair) => {
      const [key, value] = pair.split('=');
      if (key) obj[key.trim()] = value.trim();
    });

    return obj;
  }

  async insertRawData(file: Express.Multer.File) {
    // Checking for the correct file
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    if (file?.mimetype !== 'text/csv') {
      throw new UnsupportedMediaTypeException(
        'Format not accepted, make sure to only upload csv',
      );
    }

    // parsing data from the file
    const stream = Readable.from(file.buffer);
    const data = [];
    const parsePromise = new Promise((resolve, reject) => {
      stream
        .pipe(parse({ columns: true }))
        .on('data', (row) => {
          const objectName = this.parseStringToObject(row['Object Name']);

          if (row['Result Time']) {
            const mappedData = {
              resultTime: moment(row['Result Time']).toISOString(),
              enodebId: objectName['eNodeB ID'],
              cellId: objectName['Local Cell ID'],
              availDur: row['L.Cell.Avail.Dur'],
            };

            data.push(mappedData);
          }
        })
        .on('end', () => {
          resolve(data);
        })
        .on('error', (error) => {
          reject(error);
        });
    });

    try {
      const parsedData = await parsePromise;
      await this.rawDataModel.insertMany(parsedData);

      return 'data inserted';
    } catch (error) {
      throw new InternalServerErrorException(
        error?.errmsg ??
          'Error while parsing csv make sure the data is correct',
      );
    }
  }
}
