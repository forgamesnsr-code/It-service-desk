import { describe, expect, it } from 'vitest';
import { filterTickets } from './features/tickets/filter-tickets';
import { DEMO_TICKETS } from './data/demo-tickets';

describe('filterTickets с поиском', () => {
  it('находит заявку по части названия без учёта регистра', () => {
    const result = filterTickets(DEMO_TICKETS, 'all', 'КОМПЬЮТЕР');
    expect(result.length).toBeGreaterThan(0);
    result.forEach((t) =>
      expect(t.title.toLowerCase()).toContain('компьютер'),
    );
  });

  it('убирает пробелы по краям', () => {
    const result = filterTickets(DEMO_TICKETS, 'all', '  компьютер  ');
    expect(result.length).toBeGreaterThan(0);
  });

  it('возвращает пустой результат, если ничего не найдено', () => {
    const result = filterTickets(DEMO_TICKETS, 'all', 'щщщщщ');
    expect(result).toEqual([]);
  });

  it('пустой поиск не мешает базовым режимам', () => {
    expect(filterTickets(DEMO_TICKETS, 'all', '').length).toBe(DEMO_TICKETS.length);
    expect(filterTickets(DEMO_TICKETS, 'new', '').every((t) => t.status === 'new')).toBe(true);
  });
});