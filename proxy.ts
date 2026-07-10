import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { detectLocaleFromIp } from "./i18n/geo";

const intlMiddleware = createMiddleware(routing);

function hasLocalePrefix(pathname: string): boolean {
  return routing.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
}

export default async function proxy(request: NextRequest) {
  // Geo-detect only on a visitor's FIRST visit: no NEXT_LOCALE cookie yet and
  // no explicit locale in the path. next-intl writes NEXT_LOCALE once a locale
  // is resolved (and updates it when the user toggles language), so its presence
  // means the visitor already has a preference we must respect. On that first
  // request we seed the cookie from the IP-detected country; every later request
  // reuses the stored choice, letting users switch language freely.
  const isFirstVisit =
    !request.cookies.has("NEXT_LOCALE") &&
    !hasLocalePrefix(request.nextUrl.pathname);

  if (isFirstVisit) {
    const locale = await detectLocaleFromIp(request);
    if (locale) {
      request.cookies.set("NEXT_LOCALE", locale);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|admin|trpc|_next|_vercel|.*\\..*).*)",
};
