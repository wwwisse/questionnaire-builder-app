import QuizCard from '@/components/card/quiz-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Home() {
 return (
  <div className='space-y-10'>
   <div className='flex justify-center'>
    <Link href='/quiz/manage'>
     <Button>Add quiz</Button>
    </Link>
   </div>
   <div className='grid gap-7 grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]'>
    <QuizCard />
    <QuizCard />
    <QuizCard />
    <QuizCard />
    <QuizCard />
   </div>
  </div>
 );
}
