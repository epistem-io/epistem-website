import { getPayloadClient } from "./payload";

type EventLocale = "en" | "id";

export function formatEventDateRange(
  startDate: string,
  endDate: string,
  locale: EventLocale,
) {
  const normalizedLocale = locale === "id" ? "id-ID" : "en-US";
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return "";
  }

  const sameDay =
    start.getUTCFullYear() === end.getUTCFullYear() &&
    start.getUTCMonth() === end.getUTCMonth() &&
    start.getUTCDate() === end.getUTCDate();

  if (sameDay) {
    return start.toLocaleDateString(normalizedLocale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return `${start.toLocaleDateString(normalizedLocale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  })} - ${end.toLocaleDateString(normalizedLocale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}`;
}

export function formatEventLocation(
  locationDetail: string,
  locationGeneral: string,
) {
  return [locationDetail, locationGeneral].filter(Boolean).join(", ");
}

export async function getEventBySlug(slug: string, locale: "en" | "id") {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "events",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    locale,
    depth: 2,
  });

  return result.docs[0] || null;
}

export async function getFeaturedEvent(locale: "en" | "id") {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "events",
    where: {
      and: [
        {
          featured: {
            equals: true,
          },
        },
        {
          _status: {
            equals: "published",
          },
        },
      ],
    },
    sort: "startDate",
    limit: 1,
    locale,
    depth: 2,
  });

  return result.docs[0] || null;
}

export async function getPastEvents(locale: "en" | "id") {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "events",
    where: {
      and: [
        {
          featured: {
            not_equals: true,
          },
        },
        {
          endDate: {
            less_than: new Date().toISOString(),
          },
        },
        {
          _status: {
            equals: "published",
          },
        },
      ],
    },
    sort: "-startDate",
    limit: 6,
    locale,
    depth: 2,
  });

  return result.docs;
}
