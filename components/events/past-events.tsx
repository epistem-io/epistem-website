import { ArrowRightIcon, MapPinIcon, PaperclipIcon } from "lucide-react";
import Image from "next/image";

import type { Event } from "@/payload-types";
import { Link } from "@/i18n/navigation";

type PastEventsProps = {
  events: Event[];
  locale: "en" | "id";
};

const copy = {
  en: {
    title: "Past Events",
    cta: "See detail event",
  },
  id: {
    title: "Acara Sebelumnya",
    cta: "Lihat detail acara",
  },
} as const;

export function PastEvents({ events, locale }: PastEventsProps) {
  if (events.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col gap-9">
      <h2 className="font-lp-headline-xs-bold text-custom-text-grey-dark">
        {copy[locale].title}
      </h2>

      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
        {events.map((event) => (
          <PastEventCard key={event.id} event={event} locale={locale} />
        ))}
      </div>
    </section>
  );
}

type PastEventCardProps = {
  event: Event;
  locale: "en" | "id";
};

function PastEventCard({ event, locale }: PastEventCardProps) {
  const heroImage =
    typeof event.heroImage === "object" && event.heroImage?.url
      ? event.heroImage.url
      : "/images/collage.webp";

  const description = getEventSummary(event);
  const downloadsCount = event.downloads?.length ?? 0;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[20px] bg-[#fff6f9]">
      <div className="relative h-[260px] overflow-hidden rounded-t-[12px] sm:h-[280px] xl:h-[300px]">
        <Image
          src={heroImage}
          alt={event.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 420px"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <p className="font-lp-text-l-semibold text-text-icons-base-second">
            {formatEventDate(event.eventDate, locale)}
          </p>

          <Link
            href={`/events/${event.slug}`}
            className="flex shrink-0 items-center gap-2 text-primary-pink transition-colors hover:text-primary-pink-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-pink focus-visible:ring-offset-2"
          >
            <span className="font-lp-text-l-semibold">{copy[locale].cta}</span>
            <ArrowRightIcon className="size-5" />
          </Link>
        </div>

        <div className="mt-12 flex flex-1 flex-col gap-3">
          <h3 className="font-lp-headline-s-bold text-custom-text-grey-dark">
            {event.title}
          </h3>

          {description ? (
            <p className="line-clamp-3 font-lp-text-s-regular text-text-icons-base-main">
              {description}
            </p>
          ) : null}

          <div className="mt-auto flex items-end justify-between gap-4 pt-2">
            <div className="flex min-w-0 items-end gap-1 text-custom-text-grey-dark">
              <MapPinIcon className="mt-0.5 size-5 shrink-0 text-primary-pink" />
              <span className="truncate font-lp-text-l-regular">
                {event.location}
              </span>
            </div>

            {downloadsCount > 0 ? (
              <div className="flex shrink-0 items-center gap-1 rounded-[8px] border border-primary-red-pink-light-active bg-primary-red-pink-light px-2 py-1 text-primary-pink">
                <PaperclipIcon className="size-4" />
                <span className="font-lp-text-s-semibold">{downloadsCount}</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

function formatEventDate(dateString: string, locale: "en" | "id") {
  return new Date(dateString).toLocaleDateString(
    locale === "id" ? "id-ID" : "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );
}

function getEventSummary(event: Event) {
  const excerpt = event.excerpt?.trim();

  if (excerpt) {
    return excerpt;
  }

  const text = flattenLexicalText(event.content?.root?.children ?? []).trim();

  if (!text) {
    return null;
  }

  return text.length > 165 ? `${text.slice(0, 162).trimEnd()}...` : text;
}

type LexicalNode = {
  children?: LexicalNode[];
  text?: string;
};

function flattenLexicalText(nodes: LexicalNode[]): string {
  return nodes
    .flatMap((node) => {
      const parts: string[] = [];

      if (typeof node.text === "string") {
        parts.push(node.text);
      }

      if (Array.isArray(node.children) && node.children.length > 0) {
        parts.push(flattenLexicalText(node.children));
      }

      return parts;
    })
    .join(" ")
    .replace(/\s+/g, " ");
}
