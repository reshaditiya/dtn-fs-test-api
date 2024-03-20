import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<RawData>;

@Schema({ collection: 'raw_data' })
export class RawData {
  @Prop()
  resultTime: string;

  @Prop()
  enodebId: string;

  @Prop()
  cellId: string;

  @Prop()
  availDur: number;
}

export const RawDataSchema = SchemaFactory.createForClass(RawData);
