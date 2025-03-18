import QuizCard from '@/components/cards/quiz-card';
import { Button } from '@/components/ui/button';
import {
 Pagination,
 PaginationContent,
 PaginationItem,
 PaginationNext,
 PaginationPrevious,
} from '@/components/ui/pagination';
import { getAllQuizzes } from '@/server/actions';
import { QuizOutput } from '@/server/database/quiz.schema';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function Home({
 searchParams,
}: {
 searchParams: { page: string };
}) {
 const page = parseInt(searchParams?.page) || 1;

 const data = await getAllQuizzes(page);

 if (!data.data) {
  return notFound();
 }

 const quizCard = data.data?.docs.map((quiz: QuizOutput) => (
  <QuizCard key={quiz._id} data={quiz} />
 ));

 return (
  <div className='space-y-10'>
   <div className='flex justify-center'>
    <Link href='/quiz/manage'>
     <Button>Add quiz</Button>
    </Link>
   </div>
   {quizCard.length ? (
    <>
     <div className='grid gap-7 grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]'>
      {quizCard}
     </div>
     <div>
      <Pagination>
       <PaginationContent>
        {data.data.hasPrevPage && (
         <PaginationItem>
          <PaginationPrevious href={`?page=${data.data.page - 1}`} />
         </PaginationItem>
        )}
        {data.data.hasNextPage && (
         <PaginationItem>
          <PaginationNext href={`?page=${page + 1}`} />
         </PaginationItem>
        )}
       </PaginationContent>
      </Pagination>
     </div>
    </>
   ) : (
    <div className='flex justify-center'>No quizzes found</div>
   )}
  </div>
 );
}
