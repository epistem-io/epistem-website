import { getPayloadClient } from "./payload";

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
    limit: 100,
    locale,
    depth: 2,
  });

  return result.docs;
}
