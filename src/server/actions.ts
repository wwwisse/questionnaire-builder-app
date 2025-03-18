'use server';

import { passingSchema } from '@/components/forms/passing/schema';
import { PassingSchemaType } from '@/components/forms/passing/type';
import { quizSchema } from '@/components/forms/quiz/schema';
import { QuizSchemaType } from '@/components/forms/quiz/type';
import Quiz, { QuizOutput } from './database/quiz.schema';
import Result from './database/result.schema';

export type Response<T> = {
 data?: T;
 success?: boolean;
};

export const createQuiz = async (quiz: QuizSchemaType) => {
 try {
  const parsedQuiz = quizSchema.safeParse(quiz);

  if (!parsedQuiz.success) {
   return { success: false, errors: parsedQuiz.error.format() };
  }
  const newQuiz = await Quiz.create(parsedQuiz.data);
  const quizData = newQuiz.toString();
  return { success: true, data: quizData };
 } catch (error) {
  console.error('Error creating quiz:', error);
  return {
   success: false,
   message: 'An error occurred while creating the quiz',
  };
 }
};

export const updateQuiz = async (id: string, quiz: QuizSchemaType) => {
 try {
  const parsedQuiz = quizSchema.safeParse(quiz);

  if (!parsedQuiz.success) {
   return { success: false, errors: parsedQuiz.error.format() };
  }
  const newQuiz = await Quiz.updateOne({ _id: id }, parsedQuiz.data);
  const quizData = newQuiz.toString();
  return { success: true, data: quizData };
 } catch (error) {
  console.error('Error updating quiz:', error);
  return {
   success: false,
   message: 'An error occurred while updating the quiz',
  };
 }
};

export const getAllQuizzes = async (): Promise<Response<QuizOutput[]>> => {
 try {
  const quizzes = await Quiz.find().lean();
  const processedQuizzes = JSON.parse(JSON.stringify(quizzes));
  return { success: true, data: processedQuizzes };
 } catch (error) {
  console.error('Error fetching quizzes:', error);
  return {
   success: false,
  };
 }
};

export const getQuizById = async (
 id: string
): Promise<Response<QuizOutput>> => {
 try {
  const quizzes = await Quiz.findOne({
   _id: id,
  });
  const processedQuizzes = JSON.parse(JSON.stringify(quizzes));
  return { success: true, data: processedQuizzes };
 } catch (error) {
  console.error('Error fetching quizzes:', error);
  return {
   success: false,
  };
 }
};

export const deleteQuizById = async (
 id: string
): Promise<Response<QuizOutput>> => {
 try {
  const quizzes = await Quiz.findByIdAndDelete({
   _id: id,
  });
  const processedQuizzes = JSON.parse(JSON.stringify(quizzes));
  return { success: true, data: processedQuizzes };
 } catch (error) {
  console.error('Error fetching quizzes:', error);
  return {
   success: false,
  };
 }
};

export const passingQuiz = async (
 quizId: string,
 answer: PassingSchemaType,
 duration: number
) => {
 try {
  const resultQuiz = passingSchema.safeParse(answer);

  if (!resultQuiz.success) {
   return { success: false, errors: resultQuiz.error.format() };
  }

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
   message: 'An error occurred while creating the result',
  };
 }
};
