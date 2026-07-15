import { routing } from "@/i18n/routing";

/**
 * Builds the Luma app URL for the given locale so the link opens in the same
 * language the visitor is currently viewing:
 *   https://luma.epistem.io/  +  "id"  ->  https://luma.epistem.io/id
 * Falls back to "/" when NEXT_PUBLIC_LUMA_URL isn't configured.
 */
export function getLumaUrl(locale: string): string {
  const base = process.env.NEXT_PUBLIC_LUMA_URL;
  if (!base) return "/";

  const normalized = base.replace(/\/+$/, ""); // drop any trailing slash(es)
  const target = (routing.locales as readonly string[]).includes(locale)
    ? locale
    : routing.defaultLocale;

  return `${normalized}/${target}`;
}
