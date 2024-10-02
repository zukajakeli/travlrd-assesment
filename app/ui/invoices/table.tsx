import { fetchCustomers, fetchFilteredInvoices } from '@/app/lib/data';
import StatusTabs from './StatusTabs';
import TableClient from './TableClient';
import { CustomersTableType } from '@/app/lib/definitions';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const invoices = await fetchFilteredInvoices(query, currentPage);
  const customers = await fetchCustomers();

  return (
    <div className='mt-6 flow-root'>
      <TableClient invoices={invoices} customers={customers} />
    </div>
  );
}
