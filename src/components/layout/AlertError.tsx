import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Alert, AlertTitle } from "@/components/ui/alert";

export default function AlertDestructive({ message }) {
  return (
    <Alert variant='destructive'>
      <ExclamationTriangleIcon className='h-4 w-4' />
      <AlertTitle>{message}</AlertTitle>
    </Alert>
  );
}
