import ResultCard from '@/components/cards/result-card';
import PageTitle from '@/components/layout/page-title';
import { getResultById } from '@/server/actions';
import { notFound } from 'next/navigation';

export default async function ResultQuiz({
 params,
}: {
  params: Promise<{ id: string }>;
}) {
 const { id } = await params;
 const data = await getResultById(id);

 if (!data.data) {
  return notFound();
 }

 return (
  <div className='space-y-4'>
   <PageTitle>Quiz result</PageTitle>
   <div className='grid justify-items-center'>
    <ResultCard data={data.data} />
   </div>
  </div>
 );
}
