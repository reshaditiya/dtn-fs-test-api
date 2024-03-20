import { Module } from '@nestjs/common';
import { RawDataController } from './raw_data.controller';
import { RawDataService } from './raw_data.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RawData, RawDataSchema } from './raw_data.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RawData.name, schema: RawDataSchema }]),
  ],
  controllers: [RawDataController],
  providers: [RawDataService],
})
export class RawDataModule {}
