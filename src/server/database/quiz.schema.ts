import mongoose, { Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

import { QuestionOutput, questionSchema } from './question.schema';
import { SerializableDocumentPOJO } from './types';

const { Schema } = mongoose;

export interface QuizInput {
 title: string;
 description: string;
 completions: number;
 questions: QuestionOutput[];
}

export interface QuizyWithPagination {
 docs: QuizOutput[];
 totalDocs: number;
 limit: number;
 totalPages: number;
 page: number;
 pagingCounter: number;
 hasPrevPage: boolean;
 hasNextPage: boolean;
}

export interface QuizOutput extends QuizInput, SerializableDocumentPOJO {}

export interface QuizDocument extends Omit<QuizOutput, '_id'>, Document {}

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
  completions: {
   type: Number,
   default: 0,
  },
  questions: [questionSchema],
 },
 { timestamps: true }
);

quizSchema.plugin(mongoosePaginate);

const Quiz =
 mongoose.model<QuizDocument, mongoose.PaginateModel<QuizDocument>>(
  'Quiz',
  quizSchema,
  'quiz'
 );

export default Quiz;
