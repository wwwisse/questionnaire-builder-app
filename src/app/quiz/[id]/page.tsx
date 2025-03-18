import PassingForm from '@/components/forms/passing/passing-form';
import PageTitle from '@/components/layout/page-title';
import { getQuizById } from '@/server/actions';
import { notFound } from 'next/navigation';

export default async function PassQuiz({ params }: { params: { id: string } }) {
 const { id } = await params;
 const data = await getQuizById(id);

 if (!data.data) {
  return notFound();
 }

 return (
  <div className='space-y-4'>
   <PageTitle>Pass Quiz</PageTitle>
   <div className='grid justify-items-center'>
    <PassingForm data={data.data} />
   </div>
  </div>
 );
}
