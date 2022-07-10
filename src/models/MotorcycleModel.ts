import { Schema, model as createModel } from 'mongoose';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import GenericModel from './GenericModel';

const motorcycleSchema = new Schema<Motorcycle>({
  category: String,
  engineCapacity: Number,
  status: Boolean,
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
}, { versionKey: false });

export default class MotorcycleModel extends GenericModel<Motorcycle> {
  constructor(model = createModel('Motorcycle', motorcycleSchema)) {
    super(model);
  }
}
