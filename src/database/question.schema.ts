import mongoose, { Document } from 'mongoose';

import { SerializableDocumentPOJO } from '@/database/types';
import { AnswerInput, answerSchema } from './answer.schema';

const { Schema } = mongoose;

export type QuestionType = 'text' | 'single_choice' | 'multiple_choice';

export interface QuestionInput {
 text: string;
 type: QuestionType;
 answers?: AnswerInput[];
}

export interface QuestionOutput
 extends QuestionInput,
  SerializableDocumentPOJO {}

export interface QuestionDocument extends QuestionInput, Document {}

export const questionSchema = new Schema(
 {
  text: {
   type: String,
   required: true,
  },
  type: {
   type: String,
   enum: ['text', 'single_choice', 'multiple_choice'],
   required: true,
  },
  answers: [answerSchema],
 },
 { timestamps: true }
);

export default mongoose.models.TestResult<QuestionDocument> ||
 mongoose.model<QuestionDocument>('Question', questionSchema);
