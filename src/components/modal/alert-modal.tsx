'use client';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';

interface AlertModalProps {
 isOpen: boolean;
 onClose: () => void;
 onConfirm: () => void;
 loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
 isOpen,
 onClose,
 onConfirm,
 loading,
}) => {
 return (
  <Modal title='Are you sure?' isOpen={isOpen} onClose={onClose}>
   <div className='flex w-full items-center justify-end space-x-2 pt-6'>
    <Button disabled={loading} variant='secondary' onClick={onClose}>
     Cancel
    </Button>
    <Button disabled={loading} variant='destructive' onClick={onConfirm}>
     Delete
    </Button>
   </div>
  </Modal>
 );
};
