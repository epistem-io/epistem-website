"use client";

import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  PaperclipIcon,
} from "lucide-react";
import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { useEffect, useState, type ReactNode } from "react";

import type { Event } from "@/payload-types";
import { Link } from "@/i18n/navigation";
import {
  formatEventDateRange,
  formatEventLocation,
} from "@/lib/event-formatting";
import { cn } from "@/lib/utils";

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

const MOBILE_PAGE_SIZE = 3;
const TABLET_PAGE_SIZE = 4;
const DESKTOP_PAGE_SIZE = 6;

export function PastEvents({ events, locale }: PastEventsProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(MOBILE_PAGE_SIZE);
  const t = useTranslations("EventDetailPage");
  const format = useFormatter();

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia("(min-width: 1280px)");
    const tabletMediaQuery = window.matchMedia("(min-width: 768px)");

    const syncPageSize = () => {
      if (desktopMediaQuery.matches) {
        setPageSize(DESKTOP_PAGE_SIZE);
        return;
      }

      if (tabletMediaQuery.matches) {
        setPageSize(TABLET_PAGE_SIZE);
        return;
      }

      setPageSize(MOBILE_PAGE_SIZE);
    };

    syncPageSize();

    desktopMediaQuery.addEventListener("change", syncPageSize);
    tabletMediaQuery.addEventListener("change", syncPageSize);

    return () => {
      desktopMediaQuery.removeEventListener("change", syncPageSize);
      tabletMediaQuery.removeEventListener("change", syncPageSize);
    };
  }, []);

  const totalPages = Math.ceil(events.length / pageSize);
  const safePageIndex = Math.min(pageIndex, Math.max(totalPages - 1, 0));
  const startIndex = safePageIndex * pageSize;
  const visibleEvents = events.slice(startIndex, startIndex + pageSize);
  const hasPagination = totalPages > 1;
  const pageRange = getPageRange(safePageIndex, pageSize, events.length);

  if (events.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col gap-9">
      <div className="flex items-end justify-between gap-3">
        <h2 className="font-lp-headline-xs-bold text-custom-text-grey-dark">
          {copy[locale].title}
        </h2>

        <div className="flex shrink-0 items-center gap-3 md:gap-4">
          <p className="text-[12px] leading-[18px] text-text-icons-base-second md:font-lp-text-s-regular">
            {t("showingRange", {
              start: format.number(pageRange.start),
              end: format.number(pageRange.end),
              total: format.number(events.length),
            })}
          </p>

          {hasPagination ? (
            <div className="flex items-center gap-3">
              <PaginationButton
                label={t("previousPastEvents")}
                disabled={safePageIndex === 0}
                onClick={() => setPageIndex((currentPage) => currentPage - 1)}
              >
                <ChevronLeftIcon className="size-4" />
              </PaginationButton>
              <PaginationButton
                label={t("nextPastEvents")}
                disabled={safePageIndex === totalPages - 1}
                onClick={() => setPageIndex((currentPage) => currentPage + 1)}
              >
                <ChevronRightIcon className="size-4" />
              </PaginationButton>
            </div>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
        {visibleEvents.map((event) => (
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
            {formatEventDateRange(event.startDate, event.endDate, locale)}
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
                {formatEventLocation(
                  event.locationDetail,
                  event.locationGeneral,
                )}
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
  [key: string]: unknown;
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

type PaginationButtonProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  label: string;
  onClick: () => void;
};

function PaginationButton({
  children,
  className,
  disabled = false,
  label,
  onClick,
}: PaginationButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex size-6 items-center justify-center rounded-full text-text-icons-base-second transition-colors",
        "hover:text-primary-pink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-pink focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:text-[#D0D5DD]",
        className,
      )}
    >
      {children}
    </button>
  );
}

function getPageRange(pageIndex: number, pageSize: number, totalItems: number) {
  const safePageIndex = Math.min(
    Math.max(pageIndex, 0),
    Math.max(Math.ceil(totalItems / pageSize) - 1, 0),
  );
  const start = totalItems === 0 ? 0 : safePageIndex * pageSize + 1;
  const end = Math.min((safePageIndex + 1) * pageSize, totalItems);

  return { start, end };
}
