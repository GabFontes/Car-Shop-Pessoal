import { Schema, model as createModel } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import GenericModel from './GenericModel';

const carSchema = new Schema<Car>({
  doorsQty: Number,
  seatsQty: Number,
  status: Boolean,
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
}, { versionKey: false });

export default class CarModel extends GenericModel<Car> {
  constructor(model = createModel('Car', carSchema)) {
    super(model);
  }
}
