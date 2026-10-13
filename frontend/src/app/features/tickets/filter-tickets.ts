import { Ticket } from '../../models/ticket';

export type TicketFilter = 'all' | 'open' | 'new';

export function filterTickets(
  items: readonly Ticket[],
  mode: TicketFilter,
  search: string = '',
): Ticket[] {
  const query = search.trim().toLowerCase();

  let byStatus: Ticket[];
  if (mode === 'all') {
    byStatus = [...items];
  } else if (mode === 'open') {
    byStatus = items.filter((item) => item.status !== 'closed');
  } else {
    byStatus = items.filter((item) => item.status === 'new');
  }

  if (query === '') {
    return byStatus;
  }

  return byStatus.filter((item) =>
    item.title.toLowerCase().includes(query),
  );
}