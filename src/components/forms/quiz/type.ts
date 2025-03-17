import zod from 'zod';
import { quizSchema } from './schema';

export type QuizSchemaType = zod.infer<typeof quizSchema>;
