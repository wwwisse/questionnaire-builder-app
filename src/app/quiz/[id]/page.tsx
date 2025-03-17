import PageTitle from '@/components/layout/page-title';
import { getQuizById } from '@/server/actions';
import { notFound } from 'next/navigation';

export default async function PassQuiz({ params }: { params: { id: string } }) {
 const data = await getQuizById(params.id);

 if (!data.data) {
  return notFound();
 }

 return (
  <div className='space-y-4'>
   <PageTitle>Pass Quiz</PageTitle>
   <div className='grid justify-items-center'></div>
  </div>
 );
}
