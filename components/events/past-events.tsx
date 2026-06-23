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
  isOverview?: boolean;
  showTitle?: boolean;
};

type PastEventCardVariant = "overview" | "list";

// const copy = {
//   en: {
//     title: "Past Events",
//     cta: "See detail event",
//   },
//   id: {
//     title: "Acara Sebelumnya",
//     cta: "Lihat detail acara",
//   },
// } as const;

const MOBILE_PAGE_SIZE = 3;
const TABLET_PAGE_SIZE = 4;
const DESKTOP_PAGE_SIZE = 6;

const MOBILE_EVENTS_PAGE_SIZE = 3;
const MOBILE_HOME_PAGE_SIZE = 1;

export function PastEvents({
  events,
  locale,
  isOverview = false,
  showTitle = true,
}: PastEventsProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(MOBILE_PAGE_SIZE);
  const t = useTranslations("EventDetailPage");
  const format = useFormatter();

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia("(min-width: 1280px)");
    const tabletMediaQuery = window.matchMedia("(min-width: 768px)");

    const syncPageSize = () => {
      if (isOverview) {
        if (desktopMediaQuery.matches) {
          setPageSize(MOBILE_EVENTS_PAGE_SIZE);
          return;
        }

        if (tabletMediaQuery.matches) {
          setPageSize(MOBILE_HOME_PAGE_SIZE);
          return;
        }

        setPageSize(MOBILE_HOME_PAGE_SIZE);

        return;
      }

      if (desktopMediaQuery.matches) {
        setPageSize(DESKTOP_PAGE_SIZE);
        return;
      }

      if (tabletMediaQuery.matches) {
        setPageSize(MOBILE_PAGE_SIZE);
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
  }, [isOverview]);

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
    <section className="flex flex-col gap-3 md:gap-9">
      <div className="flex items-end justify-between gap-3">
        {showTitle && (
          <h2 className="font-lp-text-l-semibold md:font-lp-headline-xs-bold text-custom-text-grey-dark">
            {t("pastEventsTitle")}
            {/* {copy[locale].title} */}
          </h2>
        )}

        {!isOverview && (
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
        )}
      </div>

      <div
        className={cn("grid grid-cols-1 gap-7 lg:grid-cols-3 xl:grid-cols-3")}
      >
        {visibleEvents.map((event) => (
          <PastEventCard
            key={event.id}
            event={event}
            locale={locale}
            ctaCopy={t("pastEventsCta")}
            variant={isOverview ? "overview" : "list"}
          />
        ))}
      </div>

      {isOverview && (
        <Link
          href={`/events`}
          className="flex shrink-0 items-center gap-2 text-primary-pink transition-colors hover:text-primary-pink-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-pink focus-visible:ring-offset-2 ml-auto"
        >
          <span className="font-lp-text-l-semibold">See all events</span>
          <ArrowRightIcon className="size-5" />
        </Link>
      )}
    </section>
  );
}

type PastEventCardProps = {
  event: Event;
  locale: "en" | "id";
  ctaCopy: string;
  variant: PastEventCardVariant;
};

function PastEventCard({
  event,
  locale,
  ctaCopy,
  variant,
}: PastEventCardProps) {
  const heroImage =
    typeof event.heroImage === "object" && event.heroImage?.url
      ? event.heroImage.url
      : "/images/collage.webp";

  const description = getEventSummary(event);
  const downloadsCount = event.downloads?.length ?? 0;
  const isOverview = variant === "overview";

  return (
    <article
      className={cn(
        "overflow-hidden bg-[#fff6f9] md:flex md:h-full md:flex-col md:rounded-[20px]",
        isOverview
          ? "flex flex-col rounded-[12px]"
          : "flex items-stretch rounded-[12px]",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden md:h-[260px] md:rounded-t-[12px] lg:h-[280px] xl:h-[300px]",
          isOverview
            ? "h-[160px] w-full rounded-t-[12px]"
            : "w-[120px] shrink-0 self-stretch rounded-l-[12px] md:w-full",
        )}
      >
        <Image
          src={heroImage}
          alt={event.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 420px"
        />
      </div>

      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col",
          isOverview ? "justify-center p-3" : "px-3 py-2",
          "md:p-6",
        )}
      >
        <div className="flex items-start justify-between gap-3 md:gap-4">
          <p className="shrink-0 text-[10px] font-bold leading-6 font-pjs text-text-icons-base-second md:font-lp-text-l-semibold">
            {formatEventDateRange(event.startDate, event.endDate, locale)}
          </p>

          <Link
            href={`/events/${event.slug}`}
            className="flex shrink-0 items-center gap-1.5 text-primary-pink transition-colors hover:text-primary-pink-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-pink focus-visible:ring-offset-2 md:gap-2"
          >
            <span className="shrink-0 text-right text-[10px] font-bold leading-6 font-pjs md:font-lp-text-l-semibold">
              {/* {copy[locale].cta} */}
              {ctaCopy}
            </span>
            <ArrowRightIcon className="size-3.5 md:size-5" />
          </Link>
        </div>

        <div
          className={cn(
            "flex flex-1 flex-col",
            isOverview ? "mt-3 gap-2" : "mt-3 gap-3",
            "md:mt-12 md:gap-3",
          )}
        >
          <h3
            className={cn(
              "text-[14px] font-bold leading-normal tracking-[-0.21px] text-custom-text-grey-dark",
              isOverview ? "" : "line-clamp-2",
              "md:line-clamp-none md:font-lp-headline-s-bold md:tracking-normal",
            )}
          >
            {event.title}
          </h3>

          <div className="mt-auto flex items-end justify-between gap-4 pt-0 md:hidden">
            <div className="flex min-w-0 items-center gap-1 text-custom-text-grey-dark">
              <MapPinIcon className="size-4 shrink-0 text-primary-pink md:mt-0.5 md:size-5" />
              <span className="truncate text-[10px] font-bold leading-6 font-pjs md:font-lp-text-l-regular md:leading-normal">
                {formatEventLocation(
                  event.locationDetail,
                  event.locationGeneral,
                )}
              </span>
            </div>

            {downloadsCount > 0 ? (
              <div className="flex shrink-0 items-center gap-1 rounded-[8px] border border-primary-red-pink-light-active bg-primary-red-pink-light px-2 py-1 text-primary-pink">
                <PaperclipIcon className="size-3 md:size-4" />
                <span className="text-[12px] font-semibold leading-[18px] md:font-lp-text-s-semibold">
                  {downloadsCount}
                </span>
              </div>
            ) : null}
          </div>

          {description ? (
            <p className="hidden line-clamp-3 font-lp-text-s-regular text-text-icons-base-main md:block">
              {description}
            </p>
          ) : null}

          <div className="hidden md:mt-auto md:flex md:items-end md:justify-between md:gap-4 md:pt-2">
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
                <span className="font-lp-text-s-semibold">
                  {downloadsCount}
                </span>
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
