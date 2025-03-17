import { QuizOutput } from '@/server/database/quiz.schema';
import {
 Card,
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from '../ui/card';
import { CellAction } from './cell-action';

interface IProps {
 data: QuizOutput;
}

export default function QuizCard(props: IProps) {
 const { data } = props;

 return (
  <Card>
   <CardHeader className='flex flex-row justify-between gap-1'>
    <div className='space-y-3'>
     <CardTitle>{data.title}</CardTitle>
     <CardDescription className='line-clamp-3'>
      {data.description}
     </CardDescription>
    </div>
    <CellAction id={data._id} />
   </CardHeader>
   <CardContent className='text-sm text-muted-foreground'>
    <p>Questions: {data.questions.length}</p>
    <p>Completions: {data.completions}</p>
   </CardContent>
  </Card>
 );
}
