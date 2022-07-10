import { Request, Response } from 'express';
import GenericController,
{ RequestWithBody, ResponseError } from './GenericController';
import MotorcycleService from '../services/MotorcycleService';
import { Motorcycle } from '../interfaces/MotorcycleInterface';

export default class MotorcycleController extends GenericController
  <Motorcycle> {
  private _route: string;

  constructor(
    service = new MotorcycleService(),
    route = '/motorcycles',
  ) {
    super(service);
    this._route = route;
  }

  get route() {
    return this._route;
  }

  create = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const motorcycle = await this.service.create(body);

      if (!motorcycle) {
        return res.status(500).json({ error: this.errors.internal });
      }

      if ('error' in motorcycle) {
        return res.status(400).json({ error: motorcycle.error });
      }
      return res.status(201).json(motorcycle);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  read = async (
    _req: Request,
    res: Response<Motorcycle[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const motorcycles = await this.service.read();

      return res.status(200).json(motorcycles);
    } catch (err) {
      return res.status(500).json({ error: this.errors.badRequest });
    }
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      if (id.length !== 24) {
        return res.status(400).json({ error: this.errors.minIdLength });
      }

      const motorcycle = await this.service.readOne(id);

      if (!motorcycle) {
        return res.status(404).json({ error: this.errors.notFound });
      }

      return res.status(200).json(motorcycle);
    } catch (err) {
      return res.status(500).json({ error: this.errors.badRequest });
    }
  };

  update = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
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
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      if (id.length !== 24) {
        return res.status(400).json({ error: this.errors.minIdLength });
      }

      const motorcycle = await this.service.delete(id);

      if (!motorcycle) {
        return res.status(404).json({ error: this.errors.notFound });
      }
      return res.status(204).json(motorcycle);
    } catch (err) {
      return res.status(500).json({ error: this.errors.badRequest });
    }
  };
} 
