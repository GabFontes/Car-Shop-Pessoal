import { Request, Response } from 'express';
import GenericController,
{ RequestWithBody, ResponseError } from './GenericController';
import CarService from '../services/CarService';
import { Car } from '../interfaces/CarInterface';

export default class CarController extends GenericController<Car> {
  private _route: string;

  constructor(
    service = new CarService(),
    route = '/cars',
  ) {
    super(service);
    this._route = route;
  }

  get route() {
    return this._route;
  }

  create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const car = await this.service.create(body);

      if (!car) return res.status(500).json({ error: this.errors.internal });

      if ('error' in car) return res.status(400).json({ error: car.error });
      return res.status(201).json(car);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  read = async (
    _req: Request,
    res: Response<Car[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const cars = await this.service.read();

      return res.status(200).json(cars);
    } catch (err) {
      return res.status(500).json({ error: this.errors.badRequest });
    }
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      if (id.length !== 24) {
        return res.status(400).json({ error: this.errors.minIdLength });
      }

      const car = await this.service.readOne(id);

      if (!car) return res.status(404).json({ error: this.errors.notFound });

      return res.status(200).json(car);
    } catch (err) {
      return res.status(500).json({ error: this.errors.badRequest });
    }
  };

  update = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    const { id } = req.params;
    try {
      if (id.length !== 24) {
        return res.status(400).json({ error: this.errors.minIdLength });
      }
      const update = await this.service.update(id, body);

      if (!update) return res.status(404).json({ error: this.errors.notFound });

      if ('error' in update) {
        return res.status(400).json({ error: update.error });
      }

      return res.status(200).json(update);
    } catch (err) {
      return res.status(500).json({ error: this.errors.badRequest });
    }
  };

  delete = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      if (id.length !== 24) {
        return res.status(400).json({ error: this.errors.minIdLength });
      }

      const car = await this.service.delete(id);

      if (!car) return res.status(404).json({ error: this.errors.notFound });

      return res.status(204).json(car);
    } catch (err) {
      return res.status(500).json({ error: this.errors.badRequest });
    }
  };
} 
