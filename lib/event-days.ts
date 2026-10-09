/**
 * Shared "which day of the event is this" logic for the agenda.
 *
 * Used by both the Payload admin field (components/admin/agenda-by-day.tsx)
 * and the public event page, so the two can never disagree about how many
 * days an event has. Days are computed on UTC calendar dates, matching how
 * formatEventDateRange decides whether two dates are the same day.
 */

/** Hard ceiling so a mistyped year cannot render thousands of tabs. */
export const MAX_EVENT_DAYS = 60;

export type EventDay = {
  /** 1-based position of the day within the event. */
  index: number;
  /** Midnight UTC of that calendar day. */
  date: Date;
};

type DateInput = Date | string | null | undefined;

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function toUtcMidnight(input: DateInput): Date | null {
  if (!input) {
    return null;
  }

  const value = input instanceof Date ? input : new Date(input);

  if (Number.isNaN(value.getTime())) {
    return null;
  }

  return new Date(
    Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate()),
  );
}

/**
 * One entry per calendar day from start to end, inclusive. Empty when either
 * date is missing or invalid. An end before the start yields only the start
 * day (the collection already rejects that ordering, this is a safety net).
 */
export function getEventDays(startDate: DateInput, endDate: DateInput) {
  const start = toUtcMidnight(startDate);
  const end = toUtcMidnight(endDate);

  if (!start || !end) {
    return [];
  }

  const span = Math.floor((end.getTime() - start.getTime()) / MS_PER_DAY);
  const count = Math.min(Math.max(span, 0) + 1, MAX_EVENT_DAYS);
  const days: EventDay[] = [];

  for (let offset = 0; offset < count; offset += 1) {
    days.push({
      index: offset + 1,
      date: new Date(start.getTime() + offset * MS_PER_DAY),
    });
  }

  return days;
}

/** Agenda items saved before the day field existed have no day: treat as day 1. */
export function normalizeAgendaDay(day: unknown) {
  return typeof day === "number" && Number.isInteger(day) && day >= 1 ? day : 1;
}

type HasDay = { day?: number | null };

export type AgendaDayGroup<T> = {
  day: EventDay;
  items: T[];
};

/**
 * Buckets items by day, preserving their array order within each day. Items
 * whose day lies beyond the last event day land in `outOfRange`, which only
 * happens when the event dates were shortened after the agenda was written.
 */
export function groupAgendaByDay<T extends HasDay>(
  items: T[],
  days: EventDay[],
) {
  const byDay: AgendaDayGroup<T>[] = days.map((day) => ({ day, items: [] }));
  const outOfRange: T[] = [];

  for (const item of items) {
    const group = byDay[normalizeAgendaDay(item.day) - 1];

    if (group) {
      group.items.push(item);
    } else {
      outOfRange.push(item);
    }
  }

  return { byDay, outOfRange };
}

/** "Wed, May 20" / "Rab, 20 Mei" / "Wed 20 May", always on the UTC date. */
export function formatEventDayLabel(date: Date, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(date);
}
