import { Button } from '@/components/ui/button';
import {
 FormControl,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from '@/components/ui/select';
import { questionTypes } from '@/constants/data';
import { Trash } from 'lucide-react';
import { Control, useFormContext } from 'react-hook-form';
import AnswersForm from '../answer/answer-form';
import { QuizSchemaType } from '../quiz/type';

interface IProps {
 index: number;
 control: Control<QuizSchemaType>;
 loading: boolean;
 remove: (index: number) => void;
}

const QuestionForm = (props: IProps) => {
 const { control, index, loading, remove } = props;
 const { watch } = useFormContext<QuizSchemaType>();
 const questionType = watch(`questions.${index}.type`);

 return (
  <div>
   <div className='py-3 flex gap-6'>
    <FormField
     control={control}
     name={`questions.${index}.text`}
     render={({ field }) => (
      <FormItem>
       <FormLabel>Question title</FormLabel>
       <FormControl>
        <Input className='w-md' disabled={loading} {...field} />
       </FormControl>
       <FormMessage />
      </FormItem>
     )}
    />
    <FormField
     control={control}
     name={`questions.${index}.type`}
     render={({ field }) => (
      <FormItem>
       <FormLabel>Type</FormLabel>
       <Select
        disabled={loading}
        onValueChange={field.onChange}
        value={field.value}
        defaultValue={field.value}
       >
        <FormControl>
         <SelectTrigger>
          <SelectValue defaultValue={field.value} placeholder='Choose type' />
         </SelectTrigger>
        </FormControl>
        <SelectContent>
         {questionTypes.map((type) => (
          <SelectItem key={type.id} value={type.value}>
           {type.name}
          </SelectItem>
         ))}
        </SelectContent>
       </Select>
       <FormMessage />
      </FormItem>
     )}
    />
    {index > 0 && (
     <div className='flex items-center pt-3'>
      <Button size='sm' variant='ghost' onClick={() => remove(index)}>
       <Trash className='h-4 w-4' />
      </Button>
     </div>
    )}
   </div>
   <div className='ml-10 mt-2'>
    {(questionType === 'single_choice' ||
     questionType === 'multiple_choice') && (
     <AnswersForm control={control} index={index} loading={loading} />
    )}
   </div>
  </div>
 );
};

export default QuestionForm;
