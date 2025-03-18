import QuizForm from '@/components/forms/quiz/quiz-form';
import PageTitle from '@/components/layout/page-title';

export default async function CreateQuizTemplate() {
 return (
  <div className='space-y-4'>
   <PageTitle>Create Quiz</PageTitle>
   <div className='grid justify-items-center'>
    <QuizForm />
   </div>
  </div>
 );
}
