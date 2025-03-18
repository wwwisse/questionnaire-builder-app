'use server';

import { passingSchema } from '@/components/forms/passing/schema';
import { PassingSchemaType } from '@/components/forms/passing/type';
import { quizSchema } from '@/components/forms/quiz/schema';
import { QuizSchemaType } from '@/components/forms/quiz/type';
import { connectDb } from '@/utils/middleware/connect';
import Quiz, { QuizOutput, QuizyWithPagination } from './database/quiz.schema';
import Result, { ResulOutput, ResultWithQuiz } from './database/result.schema';

export type Response<T> = {
 data?: T;
 success?: boolean;
 message?: string;
};

export const createQuiz = async (
 quiz: QuizSchemaType
): Promise<Response<QuizOutput>> => {
 try {
  const parsedQuiz = quizSchema.safeParse(quiz);

  if (!parsedQuiz.success) {
   return {
    success: false,
    message: 'The quiz data is invalid or incomplete.',
   };
  }
  await connectDb();
  const newQuiz = await Quiz.create(parsedQuiz.data);
  const quizData = JSON.parse(JSON.stringify(newQuiz));
  return { success: true, data: quizData };
 } catch (error) {
  console.error('Error creating quiz:', error);
  return {
   success: false,
   message: 'Something went wrong while creating the quiz',
  };
 }
};

export const updateQuiz = async (
 id: string,
 quiz: QuizSchemaType
): Promise<Response<QuizOutput>> => {
 try {
  const parsedQuiz = quizSchema.safeParse(quiz);

  if (!parsedQuiz.success) {
   return {
    success: false,
    message: 'The quiz data is invalid or incomplete.',
   };
  }
  await connectDb();
  const newQuiz = await Quiz.updateOne({ _id: id }, parsedQuiz.data);
  const quizData = JSON.parse(JSON.stringify(newQuiz));
  return { success: true, data: quizData };
 } catch (error) {
  console.error('Error updating quiz:', error);
  return {
   success: false,
   message: 'Something went wrong while updating the quiz',
  };
 }
};

export const getAllQuizzes = async (
 page: number
): Promise<Response<QuizyWithPagination>> => {
 try {
  const options = {
   page,
   limit: 6,
   sort: { createdAt: -1 },
  };
  await connectDb();
  const quizzes = await Quiz.paginate({}, options);
  const processedQuizzes = JSON.parse(JSON.stringify(quizzes));
  return { success: true, data: processedQuizzes };
 } catch (error) {
  console.error('Error fetching quizzes:', error);
  return {
   success: false,
   message: 'Something went wrong while getting the quiz',
  };
 }
};

export const getQuizById = async (
 id: string
): Promise<Response<QuizOutput>> => {
 try {
  await connectDb();
  const quizzes = await Quiz.findOne({
   _id: id,
  });
  const processedQuizzes = JSON.parse(JSON.stringify(quizzes));
  return { success: true, data: processedQuizzes };
 } catch (error) {
  console.error('Error fetching quizzes:', error);
  return {
   success: false,
   message: 'Something went wrong while getting quiz by id',
  };
 }
};

export const deleteQuizById = async (
 id: string
): Promise<Response<QuizOutput>> => {
 try {
  await connectDb();
  const quizzes = await Quiz.findByIdAndDelete({
   _id: id,
  });
  const processedQuizzes = JSON.parse(JSON.stringify(quizzes));
  return { success: true, data: processedQuizzes };
 } catch (error) {
  console.error('Error fetching quizzes:', error);
  return {
   success: false,
   message: 'Something went wrong while deleting the quiz',
  };
 }
};

export const passingQuiz = async (
 quizId: string,
 answer: PassingSchemaType,
 duration: number
): Promise<Response<ResulOutput>> => {
 try {
  const resultQuiz = passingSchema.safeParse(answer);

  if (!resultQuiz.success) {
   return { success: false };
  }
  await connectDb();

  const newResult = await Result.create({
   quizId,
   answers: resultQuiz.data.answers,
   duration,
  });
  await Quiz.updateOne({ _id: quizId }, { $inc: { completions: 1 } });
  const processedResult = JSON.parse(JSON.stringify(newResult));
  return { success: true, data: processedResult };
 } catch (error) {
  console.error('Error creating result:', error);
  return {
   success: false,
   message: 'Something went wrong while passing the quiz',
  };
 }
};

export const getResultById = async (
 id: string
): Promise<Response<ResultWithQuiz>> => {
 try {
  await connectDb();
  const quizzes = await Result.findOne({
   _id: id,
  }).populate('quizId');
  const processedQuizzes = JSON.parse(JSON.stringify(quizzes));
  return { success: true, data: processedQuizzes };
 } catch (error) {
  console.error('Error fetching quizzes:', error);
  return {
   success: false,
   message: 'Something went wrong while getting result',
  };
 }
};
