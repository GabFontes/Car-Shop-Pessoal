import { Model as M } from 'mongoose';
import { Model } from '../interfaces/ModelInterface';

export default abstract class GenericModel<T> implements Model<T> {
  constructor(protected model: M<T>) { }

  update = async (id: string, obj: T): Promise<T | null> =>
    this.model
      .findOneAndUpdate({ _id: id }, obj, { returnOriginal: false });

  delete = async (id: string): Promise<T | null> =>
    this.model.findOneAndDelete({ _id: id });

  create = async (obj: T): Promise<T> => this.model.create({ ...obj });

  read = async (): Promise<T[]> => this.model.find();

  readOne = async (id: string): Promise<T | null> =>
    this.model.findOne({ _id: id });
}
