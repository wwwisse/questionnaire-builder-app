'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFieldArray, useForm } from 'react-hook-form';

import {
 Card,
 CardContent,
 CardFooter,
 CardHeader,
} from '@/components/ui/card';
import {
 Form,
 FormControl,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';

import { Separator } from '@/components/ui/separator';
import { defaultQuestion, defaultQuiz } from '@/constants/data';
import { createQuiz, updateQuiz } from '@/server/actions';
import { QuizOutput } from '@/server/database/quiz.schema';
import { useRouter } from 'next/navigation';
import QuestionForm from '../question/question-form';
import { quizSchema } from './schema';
import { QuizSchemaType } from './type';

interface IProps {
 data?: QuizOutput;
}

const QuizForm = (props: IProps) => {
 const { data } = props;
 const [loading, setLoading] = useState(false);
 const router = useRouter();

 const defaultValues = data ? data : defaultQuiz;

 const form = useForm<QuizSchemaType>({
  resolver: zodResolver(quizSchema),
  defaultValues,
 });

 const { fields, append, remove } = useFieldArray({
  control: form.control,
  name: 'questions',
 });

 const action = data ? 'Edit' : 'Create';

 const onSubmit = async (quiz: QuizSchemaType) => {
  try {
   setLoading(true);
   if (data) {
    await updateQuiz(data._id, quiz);
   } else {
    await createQuiz(quiz);
   }
   router.push(`/`);
   router.refresh();
  } catch (error) {
   console.error('Error:', error);
  } finally {
   setLoading(false);
  }
 };

 const addQuestionField = () => {
  if (fields.length < 10) append(defaultQuestion);
 };

 const removeQuestionField = (index: number) => {
  if (fields.length > 1) remove(index);
 };

 const renderQuestionList = () => {
  return fields?.map((data, index) => (
   <QuestionForm
    key={data.id}
    index={index}
    control={form.control}
    loading={loading}
    remove={removeQuestionField}
   />
  ));
 };

 return (
  <Card className='w-full max-w-screen-lg'>
   <CardHeader className='flex flex-row items-center justify-between gap-1'>
    <Button
     disabled={loading}
     className='ml-auto'
     type='submit'
     form='form-quiz'
    >
     {action}
    </Button>
   </CardHeader>
   <CardContent>
    <Form {...form}>
     <form
      onSubmit={form.handleSubmit(onSubmit)}
      className='w-full space-y-8'
      id='form-quiz'
     >
      <div className='space-y-4'>
       <FormField
        control={form.control}
        name='title'
        render={({ field }) => (
         <FormItem>
          <FormLabel>Title</FormLabel>
          <FormControl>
           <Input disabled={loading} placeholder='Title ...' {...field} />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />
       <FormField
        control={form.control}
        name='description'
        render={({ field }) => (
         <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
           <Textarea
            className='resize-none'
            placeholder='Description ...'
            disabled={loading}
            rows={5}
            {...field}
           />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />
       <Separator className='my-9' />
       <div>{renderQuestionList()}</div>
      </div>
     </form>
    </Form>
   </CardContent>
   <CardFooter className='justify-center border-t p-4'>
    <Button
     size='sm'
     variant='ghost'
     className='gap-1'
     onClick={addQuestionField}
    >
     <PlusCircle className='h-3.5 w-3.5' />
     Add question
    </Button>
   </CardFooter>
  </Card>
 );
};

export default QuizForm;
