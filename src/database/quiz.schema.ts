import mongoose, { Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

import { QuestionInput, questionSchema } from './question.schema';
import { ResulOutput, resultSchema } from './result.schema';
import { SerializableDocumentPOJO } from './types';

const { Schema } = mongoose;

export interface QuizInput {
 title: string;
 description: string;
 completions: number;
 questions: QuestionInput[];
 results?: ResulOutput[];
}

export interface QuizOutput extends QuizInput, SerializableDocumentPOJO {}

export interface QuizDocument extends QuizInput, Document {}

const quizSchema = new Schema(
 {
  title: {
   type: String,
   required: true,
  },
  description: {
   type: String,
   required: true,
  },
  results: [resultSchema],
  questions: [questionSchema],
 },
 { timestamps: true }
);

quizSchema.plugin(mongoosePaginate);

const Quiz = mongoose.model<QuizDocument, mongoose.PaginateModel<QuizDocument>>(
 'Quiz',
 quizSchema
);

export default Quiz;
