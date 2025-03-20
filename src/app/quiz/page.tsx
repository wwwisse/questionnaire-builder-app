import QuizCard from '@/components/cards/quiz-card';
import { Button } from '@/components/ui/button';
import {
 Pagination,
 PaginationContent,
 PaginationItem,
 PaginationNext,
 PaginationPrevious,
} from '@/components/ui/pagination';
import SortSelect from '@/components/ui/sort-select';
import { getAllQuizzes } from '@/server/actions';
import { QuizOutput } from '@/server/database/quiz.schema';
import Link from 'next/link';
import NotFound from '../not-found';

export default async function Home(props: {
 searchParams: Promise<{ page: string; sort: string }>;
}) {
 const searchParams = await props.searchParams;
 const page = parseInt(searchParams?.page) || 1;
 const sort = searchParams?.sort || 'title';

 const data = await getAllQuizzes(page, sort);

 if (!data.data) {
  return <NotFound />;
 }

 const quizCard = data.data?.docs.map((quiz: QuizOutput) => (
  <QuizCard key={quiz._id} data={quiz} />
 ));

 return (
  <div className='space-y-10'>
   <div className='flex flex-col items-center gap-y-7'>
    <Link href='/quiz/manage'>
     <Button>Add quiz</Button>
    </Link>
    <SortSelect selected={sort} />
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
