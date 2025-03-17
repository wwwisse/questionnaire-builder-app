import mongoose, { Document, Schema } from 'mongoose';
import { SerializableDocumentPOJO } from './types';

const { ObjectId } = Schema;

export interface ResultInput {
 quizId: string;
 answers: {
  questionId: string;
  selectedAnswers?: string[];
  answerText?: string;
 }[];
 duration: number;
}

export interface ResulOutput extends ResultInput, SerializableDocumentPOJO {}

export interface ResultDocument extends Omit<ResulOutput, '_id'>, Document {}

export const resultSchema = new Schema(
 {
  quizId: {
   type: ObjectId,
   ref: 'Quiz',
  },
  answers: [
   {
    questionId: {
     type: ObjectId,
     ref: 'Quiz.questions',
    },
    selectedAnswers: {
     type: [String],
     default: [],
    },
    answerText: {
     type: String,
     default: '',
    },
   },
  ],
  duration: {
   type: Number,
   required: true,
  },
 },
 { timestamps: true }
);

export default mongoose.models.Result<ResultDocument> ||
 mongoose.model<ResultDocument>('Result', resultSchema);
