import { z } from 'zod';
import { VehicleSchema } from './VehicleInterface';

export const MotorcycleSchema = z.object({
  category: z.string({
    required_error: 'category is required',
    invalid_type_error: 'category must be a string',
  }),
  engineCapacity: z.number({
    required_error: 'engineCapacity is required',
    invalid_type_error: 'engineCapacity must be a number',
  }).positive().int().lte(2500),
});

const MotocycleVehicle = z.intersection(MotorcycleSchema, VehicleSchema);

export { MotocycleVehicle };
export type Motorcycle = z.infer<typeof MotocycleVehicle>;
