import { z } from 'zod';
import { VehicleSchema } from './VehicleInterface';

export const CarSchema = z.object({
  doorsQty: z.number({
    required_error: 'doorsQty is required',
    invalid_type_error: 'doorsQty must be a number',
  }).gte(2).lte(4),
  seatsQty: z.number({
    required_error: 'seatsQty is required',
    invalid_type_error: 'seatsQty must be a number',
  }).gte(2).lte(7),
});

const CarVehicle = z.intersection(CarSchema, VehicleSchema);

export { CarVehicle };
export type Car = z.infer<typeof CarVehicle>;
