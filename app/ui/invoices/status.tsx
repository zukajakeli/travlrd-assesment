'use client';
import { State, updateInvoice } from '@/app/lib/actions';
import { CheckIcon, ClockIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useState, useActionState } from 'react';
import { Button } from '../button';

export default function InvoiceStatus({
  status,
  invoiceId,
  customerId,
}: {
  status: string;
  invoiceId: string;
  customerId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const initialState: State = { message: null, errors: {} };
  const updateInvoiceWithId = updateInvoice.bind(null, invoiceId);
  const [state, formAction] = useActionState(updateInvoiceWithId, initialState);

  return (
    <span className={clsx('flex cursor-pointer')}>
      <span
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'inline-flex items-center rounded-full px-2 py-1 text-xs',
          {
            'bg-gray-100 text-gray-500': status === 'pending',
            'bg-green-500 text-white': status === 'paid',
            'bg-yellow-500 text-white': status === 'overdue',
            'bg-red-500 text-white': status === 'canceled',
          }
        )}>
        {status === 'pending' ? (
          <>
            Pending
            <ClockIcon className='ml-1 w-4 text-gray-500' />
          </>
        ) : null}
        {status === 'paid' ? (
          <>
            Paid
            <CheckIcon className='ml-1 w-4 text-white' />
          </>
        ) : null}
        {status === 'overdue' ? (
          <>
            Overdue
            <ClockIcon className='ml-1 w-4 text-white-500' />
          </>
        ) : null}
        {status === 'canceled' ? (
          <>
            Canceled
            <XMarkIcon className='ml-1 w-4 text-white-500' />
          </>
        ) : null}
      </span>

      {/* Sorry for inline styling :) Don't have time to master clsx yet  */}
      {isOpen && (
        <span
          style={{
            position: 'absolute',
            marginTop: '30px',
          }}>
          <form action={formAction}>
            <div className='rounded-md border border-gray-200 bg-white px-[14px] py-3'>
              <div className='hidden'>
                <input
                  id='customer'
                  name='customerId'
                  defaultValue={customerId}
                />
                <input id='amount' name='amount' defaultValue={5} />
              </div>
              <div className='flex flex-col gap-2'>
                <div
                  className={clsx('flex items-center', {
                    hidden: status === 'pending',
                  })}>
                  <input
                    id='pending'
                    name='status'
                    type='radio'
                    value='pending'
                    defaultChecked={status === 'pending'}
                    className='h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2'
                  />
                  <label
                    htmlFor='pending'
                    className='ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600'>
                    Pending <ClockIcon className='h-4 w-4' />
                  </label>
                </div>
                <div
                  className={clsx('flex items-center', {
                    hidden: status === 'paid',
                  })}>
                  <input
                    id='paid'
                    name='status'
                    type='radio'
                    value='paid'
                    defaultChecked={status === 'paid'}
                    className='h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2'
                  />
                  <label
                    htmlFor='paid'
                    className='ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white'>
                    Paid <CheckIcon className='h-4 w-4' />
                  </label>
                </div>
                <div
                  className={clsx('flex items-center', {
                    hidden: status === 'canceled',
                  })}>
                  <input
                    id='canceled'
                    name='status'
                    type='radio'
                    value='canceled'
                    defaultChecked={status === 'canceled'}
                    className='h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2'
                  />
                  <label
                    htmlFor='paid'
                    className='ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white'>
                    Canceled <XMarkIcon className='ml-1 w-4 text-white-500' />
                  </label>
                </div>
                <div
                  className={clsx('flex items-center', {
                    hidden: status === 'overdue',
                  })}>
                  <input
                    id='overdue'
                    name='status'
                    type='radio'
                    value='overdue'
                    defaultChecked={status === 'overdue'}
                    className='h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2'
                  />
                  <label
                    htmlFor='paid'
                    className='ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-yellow-500 px-3 py-1.5 text-xs font-medium text-white'>
                    Overdue <ClockIcon className='ml-1 w-4 text-white-500' />
                  </label>
                </div>
              </div>
              <div className='mt-2 flex justify-end gap-4'>
                <Button className='h-6' type='submit'>
                  Edit Invoice
                </Button>
              </div>
            </div>
          </form>
        </span>
      )}
    </span>
  );
}
