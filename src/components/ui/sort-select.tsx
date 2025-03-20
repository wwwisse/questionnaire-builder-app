'use client';

import { defaultSort } from '@/constants/data';
import { useRouter, useSearchParams } from 'next/navigation';
import {
 Select,
 SelectContent,
 SelectGroup,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from './select';

interface IProps {
 selected: string;
}

const SortSelect = (props: IProps) => {
 const { selected } = props;
 const router = useRouter();
 const searchParams = useSearchParams();
 const page = searchParams.get('page') || '1';

 const handleSortChange = (value: string) => {
  router.push(`?page=${page}&sort=${value}`);
 };

 return (
  <Select onValueChange={handleSortChange} defaultValue={selected}>
   <SelectTrigger className='w-[180px] bg-card text-foreground'>
    <SelectValue />
   </SelectTrigger>
   <SelectContent>
    <SelectGroup>
     {defaultSort.map((item) => (
      <SelectItem key={item.id} value={item.value}>
       {item.label}
      </SelectItem>
     ))}
    </SelectGroup>
   </SelectContent>
  </Select>
 );
};

export default SortSelect;
