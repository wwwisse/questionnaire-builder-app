import mongoose, { Document, Schema } from 'mongoose';
import { SerializableDocumentPOJO } from './types';

export interface ResultInput {
 quizId: Schema.Types.ObjectId;
 answers: {
  questionId: Schema.Types.ObjectId;
  selectedAnswers?: string[];
  answerText?: string;
 }[];
 duration: number;
}

export interface ResulOutput extends ResultInput, SerializableDocumentPOJO {}

export interface ResultDocument extends ResultInput, Document {}

export const resultSchema = new Schema(
 {
  quizId: {
   type: Schema.Types.ObjectId,
   required: true,
  },
  answers: [
   {
    questionId: {
     type: Schema.Types.ObjectId,
     ref: 'Question',
     required: true,
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
