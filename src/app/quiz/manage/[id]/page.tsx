import NotFound from '@/app/not-found';
import QuizForm from '@/components/forms/quiz/quiz-form';
import PageTitle from '@/components/layout/page-title';
import { getQuizById } from '@/server/actions';

export default async function EditQuizTemplate({
 params,
}: {
 params: Promise<{ id: string }>;
}) {
 const { id } = await params;
 const data = await getQuizById(id);

 if (!data.data) {
  return <NotFound />;
 }

 return (
  <div className='space-y-4'>
   <PageTitle>Edit Quiz</PageTitle>
   <div className='grid justify-items-center'>
    <QuizForm data={data.data} />
   </div>
  </div>
 );
}
