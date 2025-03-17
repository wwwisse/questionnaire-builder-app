import QuizCard from '@/components/card/quiz-card';
import { Button } from '@/components/ui/button';
import { getAllQuizzes } from '@/server/actions';
import { QuizOutput } from '@/server/database/quiz.schema';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function Home() {
 const data = await getAllQuizzes();

 if (!data.data) {
  return notFound();
 }

 const quizCard = data.data?.map((quiz: QuizOutput) => (
  <QuizCard key={quiz._id} data={quiz} />
 ));

 return (
  <div className='space-y-10'>
   <div className='flex justify-center'>
    <Link href='/quiz/manage'>
     <Button>Add quiz</Button>
    </Link>
   </div>
   <div className='grid gap-7 grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]'>
    {quizCard}
   </div>
  </div>
 );
}
