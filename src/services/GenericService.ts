// src/services/index.ts

import { ZodError } from 'zod';
import { Model } from '../interfaces/ModelInterface';

export interface ServiceError {
  error: ZodError | string;
}

export default abstract class GenericService<T> {
  constructor(protected model: Model<T>) { }

  abstract read(): Promise<T[]>;

  abstract readOne(id: string): Promise<T | null>;

  abstract create(obj: T): Promise<T | null | ServiceError>;

  abstract update(id: string, obj: T): Promise<T | null | ServiceError>;

  abstract delete(id: string): Promise<T | null>;
}
