import {
 Card,
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from '../ui/card';
import { CellAction } from './cell-action';

export default function QuizCard() {
 return (
  <Card>
   <CardHeader className='flex flex-row justify-between gap-1'>
    <div className='space-y-3'>
     <CardTitle>Title</CardTitle>
     <CardDescription className='line-clamp-3'>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam labore cum
      ipsa amet aut ad, illum adipisci praesentium nihil nisi ut voluptate
     </CardDescription>
    </div>
    <CellAction />
   </CardHeader>
   <CardContent className='text-sm text-muted-foreground'>
    <p>Questions: 17</p>
    <p>Completions: 17</p>
   </CardContent>
  </Card>
 );
}
