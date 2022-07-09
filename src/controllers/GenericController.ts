import { Request, Response } from 'express';
import GenericService from '../services/GenericService';

export type ResponseError = {
  error: unknown;
};

export interface RequestWithBody<T> extends Request {
  body: T;
}

enum ControllerErrors {
  internal = 'Internal Server Error',
  notFound = 'Object not found',
  requiredId = 'Id is required',
  minIdLength = 'Id must have 24 hexadecimal characters',
  badRequest = 'Bad request',
}

export default abstract class GenericController<T> {
  abstract route: string;

  protected errors;

  constructor(public service: GenericService<T>) {
    this.errors = ControllerErrors;
  }

  abstract create(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  abstract read(
    _req: Request,
    res: Response<T[] | ResponseError>,
  ): Promise<typeof res>;

  abstract readOne(
    req: Request<{ id: string; }>,
    res: Response<T | ResponseError>
  ): Promise<typeof res>;

  abstract update(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>
  ): Promise<typeof res>;

  abstract delete(
    req: Request<{ id: string; }>,
    res: Response<T | ResponseError>
  ): Promise<typeof res>;
}
