import { describe, expect, it } from 'vitest';
import { DEMO_TICKETS } from '../../data/demo-tickets';
import { filterTickets } from './filter-tickets';

const ids = (items: ReturnType<typeof filterTickets>) => items.map((item) => item.id);

describe('filterTickets: поиск по заголовку', () => {
  it('находит заявку без учёта регистра и пробелов по краям', () => {
    expect(ids(filterTickets(DEMO_TICKETS, 'all', '  КОМПЬЮТЕР '))).toEqual([1]);
  });
  it('работает совместно с режимом', () => {
    expect(ids(filterTickets(DEMO_TICKETS, 'new', 'проектор'))).toEqual([]);
    expect(ids(filterTickets(DEMO_TICKETS, 'open', 'проектор'))).toEqual([2]);
  });
  it('пустой поиск не меняет результат', () => {
    expect(ids(filterTickets(DEMO_TICKETS, 'open', '   '))).toEqual([1, 2]);
  });
});
