import zod from 'zod';
import { passingSchema } from './schema';

export type PassingSchemaType = zod.infer<typeof passingSchema>;