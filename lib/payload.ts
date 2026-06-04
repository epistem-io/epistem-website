import { getPayload } from "payload";
import config from "@payload-config";

let cached = null as Awaited<ReturnType<typeof getPayload>> | null;

export async function getPayloadClient() {
  if (!cached) {
    cached = await getPayload({ config });
  }

  return cached;
}
