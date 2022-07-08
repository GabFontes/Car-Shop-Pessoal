import { Car, CarVehicle } from '../interfaces/CarInterface';
import GenericService, { ServiceError } from './GenericService';
import CarModel from '../models/CarModel';

export default class CarService extends GenericService<Car> {
  constructor(model = new CarModel()) {
    super(model);
  }

  create = async (obj: Car): Promise<Car | ServiceError | null> => {
    const parsed = CarVehicle.safeParse(obj);

    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(obj);
  };

  read = async (): Promise<Car[]> => this.model.read();

  readOne = async (id: string): Promise<Car | null> => this.model.readOne(id);

  update = async (id: string, obj: Car): Promise<Car | ServiceError | null> => {
    const parsed = CarVehicle.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.update(id, obj);
  };

  delete = async (id: string): Promise<Car | null> => this.model.delete(id);
}
