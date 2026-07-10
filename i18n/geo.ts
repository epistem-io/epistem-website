import type { NextRequest } from "next/server";
import { routing } from "./routing";

type Locale = (typeof routing.locales)[number];

/**
 * Maps an ISO 3166-1 alpha-2 country code to a locale. Any country not listed
 * here falls back to `routing.defaultLocale` ("en"). Indonesia -> "id".
 */
const COUNTRY_TO_LOCALE: Partial<Record<string, Locale>> = {
  ID: "id",
};

const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // remember a successful lookup for 24h
const NEGATIVE_TTL_MS = 5 * 60 * 1000; // retry failed lookups after 5min
const LOOKUP_TIMEOUT_MS = 1500; // never let geo detection stall a request

// In-memory per-IP cache. Persists for the lifetime of the middleware isolate,
// which keeps us well within ipapi.co's free-tier rate limits since the lookup
// only fires on the initial (locale-less) request per visitor anyway.
const cache = new Map<string, { country: string | null; expires: number }>();

function getClientIp(request: NextRequest): string | null {
  // Behind nginx/reverse proxy the real client IP is the first entry of
  // X-Forwarded-For; X-Real-IP is a common fallback.
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return null;
}

function isPrivateOrLocalIp(ip: string): boolean {
  return (
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    ip.startsWith("::ffff:127.") ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(ip) ||
    ip.startsWith("fc") ||
    ip.startsWith("fd")
  );
}

async function lookupCountry(ip: string): Promise<string | null> {
  const now = Date.now();
  const cached = cache.get(ip);
  if (cached && cached.expires > now) return cached.country;

  let country: string | null = null;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), LOOKUP_TIMEOUT_MS);
    // ipapi.co returns the bare 2-letter country code as plain text.
    const response = await fetch(`https://ipapi.co/${ip}/country/`, {
      signal: controller.signal,
      headers: { "User-Agent": "epistem-website/geo-locale" },
    });
    clearTimeout(timeout);
    if (response.ok) {
      const text = (await response.text()).trim().toUpperCase();
      if (/^[A-Z]{2}$/.test(text)) country = text;
    }
  } catch {
    // Timeout, network error, or rate limit -> treat as unknown.
    country = null;
  }

  cache.set(ip, {
    country,
    expires: now + (country ? CACHE_TTL_MS : NEGATIVE_TTL_MS),
  });
  return country;
}

/**
 * Resolves the locale for a request from the visitor's IP-based country.
 * Returns `null` when detection is disabled, the IP is local/private, or the
 * lookup fails — callers should then let next-intl fall back to its defaults.
 */
export async function detectLocaleFromIp(
  request: NextRequest
): Promise<Locale | null> {
  if (process.env.GEO_LOCALE_DETECTION === "false") return null;

  const ip = getClientIp(request);

  if (!ip || isPrivateOrLocalIp(ip)) {
    log(`ip=${ip ?? "unknown"} (local/private) -> no geo redirect (default locale)`);
    return null;
  }

  const country = await lookupCountry(ip);
  if (!country) {
    log(`ip=${ip} country=unknown -> no geo redirect (default locale)`);
    return null;
  }

  const locale = COUNTRY_TO_LOCALE[country] ?? routing.defaultLocale;
  log(`ip=${ip} country=${country} -> locale=${locale}`);
  return locale;
}

// Logs the geo decision to the server console. On by default in dev; enable in
// production with GEO_LOCALE_DEBUG=true.
function log(message: string): void {
  if (process.env.NODE_ENV !== "production" || process.env.GEO_LOCALE_DEBUG === "true") {
    console.log(`[geo-locale] ${message}`);
  }
}
