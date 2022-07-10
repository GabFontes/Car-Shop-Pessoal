import {
  Motorcycle,
  MotocycleVehicle,
} from '../interfaces/MotorcycleInterface';
import GenericService, { ServiceError } from './GenericService';
import MotorcycleModel from '../models/MotorcycleModel';

const categoryVerify = (category: string): boolean => {
  if (category === 'Street') return true;
  if (category === 'Custom') return true;
  if (category === 'Trail') return true;
  return false;
};

export default class MotorcycleService extends GenericService<Motorcycle> {
  constructor(model = new MotorcycleModel()) {
    super(model);
  }

  create = async (
    obj: Motorcycle,
  ): Promise<Motorcycle | ServiceError | null> => {
    const parsed = MotocycleVehicle.safeParse(obj);
    if (!categoryVerify(obj.category)) {
      return { error: 'Invalid category' };
    }
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(obj);
  };

  read = async (): Promise<Motorcycle[]> => this.model.read();

  readOne = async (
    id: string,
  ): Promise<Motorcycle | null> => this.model.readOne(id);

  update = async (
    id: string,
    obj: Motorcycle,
  ): Promise<Motorcycle | ServiceError | null> => {
    if (!categoryVerify(obj.category)) {
      return { error: 'Invalid category' };
    }
    const parsed = MotocycleVehicle.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.update(id, obj);
  };

  delete = async (
    id: string,
  ): Promise<Motorcycle | null> => this.model.delete(id);
}
