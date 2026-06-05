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
