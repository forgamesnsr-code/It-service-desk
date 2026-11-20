import { Ticket } from '../../models/ticket';

export type TicketFilter = 'all' | 'open' | 'new';

export function filterTickets(
  items: readonly Ticket[],
  mode: TicketFilter,
  search = '',
): Ticket[] {
  let result: Ticket[];
  if (mode === 'all') {
    result = [...items];
  } else if (mode === 'open') {
    result = items.filter((item) => item.status !== 'closed');
  } else {
    result = items.filter((item) => item.status === 'new');
  }
  const query = search.trim().toLowerCase();
  if (!query) return result;
  return result.filter((item) => item.title.toLowerCase().includes(query));
}
