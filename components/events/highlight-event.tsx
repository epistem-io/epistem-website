import { CalendarDaysIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { Event } from "@/payload-types";
import { getTranslations } from "next-intl/server";

type HighlightEventProps = {
  event: Event;
  locale: "en" | "id";
};

type HighlightEventCopy = {
  upcomingEvent: string;
  featuredEventCta: string;
  eventDurationDay: string;
  eventDurationDays: string;
};

type HighlightEventViewProps = HighlightEventProps & {
  copy: HighlightEventCopy;
};

export async function HighlightEvent({ event, locale }: HighlightEventProps) {
  const t = await getTranslations("EventDetailPage");

  return (
    <HighlightEventView
      event={event}
      locale={locale}
      copy={{
        upcomingEvent: t("upcomingEvent"),
        featuredEventCta: t("featuredEventCta"),
        eventDurationDay: t("eventDurationDay"),
        eventDurationDays: t("eventDurationDays"),
      }}
    />
  );
}

export function HighlightEventView({
  event,
  locale,
  copy,
}: HighlightEventViewProps) {
  const heroImage =
    typeof event.heroImage === "object" && event.heroImage?.url
      ? event.heroImage.url
      : "/images/collage.webp";

  const description = getEventSummary(event);
  const dateTitle = formatFeaturedEventDateRange(
    event.startDate,
    event.endDate,
    locale,
  );
  const dateSubtitle = formatEventDuration(
    event.startDate,
    event.endDate,
    locale,
    copy.eventDurationDay,
    copy.eventDurationDays,
  );

  return (
    <article className="overflow-hidden rounded-[12px] bg-primary-red-pink-light p-3 md:rounded-[20px] md:p-6">
      <div className="flex flex-col gap-3 md:gap-6 lg:flex-row lg:items-stretch">
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="font-lp-text-xs-semibold text-primary-pink md:font-lp-text-xl-bold">
            {copy.upcomingEvent}
          </p>

          <div className="mt-3 flex flex-1 flex-col md:mt-4">
            <h2 className="text-custom-text-grey-dark [font-family:var(--font-pjs)] text-[18px] font-semibold leading-[26px] md:font-lp-headline-l-semibold md:text-[36px] md:leading-[44px]">
              {event.title}
            </h2>

            {description ? (
              <p className="mt-2 line-clamp-2 text-[12px] leading-[18px] text-text-icons-base-main md:mt-6 md:max-w-[650px] md:line-clamp-none md:font-lp-text-xl-regular">
                {description}
              </p>
            ) : null}

            <div className="mt-4 grid grid-cols-2 gap-2.5 md:mt-6 md:gap-5">
              <MetadataChip
                icon={
                  <CalendarDaysIcon className="size-[18px] text-primary-pink md:size-6" />
                }
                title={dateTitle}
                subtitle={dateSubtitle}
              />
              <MetadataChip
                icon={
                  <MapPinIcon className="size-[18px] text-primary-pink md:size-6" />
                }
                title={event.locationGeneral}
                subtitle={event.locationDetail}
              />
            </div>

            <div className="mt-4 md:mt-6">
              <Button
                asChild
                variant="primary"
                className="h-auto rounded-[8px] px-2 py-1 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)] md:px-5 md:py-3"
              >
                <Link
                  href={`/events/${event.slug}`}
                  className="gap-1.5 md:gap-2"
                >
                  <span className="font-aptos text-[13px] font-semibold leading-[18px] md:font-text-button-semibold-large">
                    {copy.featuredEventCta}
                  </span>
                  {/* <ArrowRightIcon className="hidden size-4 md:block" /> */}
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="relative h-[300px] overflow-hidden rounded-[12px] md:h-[240px] lg:order-2 lg:h-auto lg:w-[480px] lg:shrink-0">
          <Image
            src={heroImage}
            alt={event.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 767px) 100vw, (max-width: 1024px) 100vw, 480px"
          />
        </div>
      </div>
    </article>
  );
}

type MetadataChipProps = {
  icon: ReactNode;
  title: string;
  subtitle?: string | null;
};

function MetadataChip({ icon, title, subtitle }: MetadataChipProps) {
  return (
    <div className="min-w-0 rounded-[8px] border border-primary-red-pink-light-active bg-[#fff6f9] p-2 md:rounded-[16px] md:p-4">
      <div className="flex items-start gap-2 md:items-center md:gap-3">
        <div className="shrink-0">{icon}</div>
        <div className="min-w-0">
          <p
            className={cn(
              "truncate text-[12px] font-semibold leading-[18px] text-text-icons-base-second md:font-lp-headline-xxs-bold md:tracking-[-0.2px]",
            )}
          >
            {title}
          </p>
          {subtitle ? (
            <p className="truncate text-[12px] leading-[18px] text-text-icons-base-second md:font-lp-text-s-regular">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function formatFeaturedEventDateRange(
  startDate: string,
  endDate: string,
  locale: "en" | "id",
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

  const sameMonth =
    start.getUTCFullYear() === end.getUTCFullYear() &&
    start.getUTCMonth() === end.getUTCMonth();

  if (sameMonth) {
    const monthYear = start.toLocaleDateString(normalizedLocale, {
      month: "long",
      year: "numeric",
    });

    return `${start.getUTCDate()}-${end.getUTCDate()} ${monthYear}`;
  }

  return `${start.toLocaleDateString(normalizedLocale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  })} - ${end.toLocaleDateString(normalizedLocale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  })}`;
}

function formatEventDuration(
  startDate: string,
  endDate: string,
  locale: "en" | "id",
  dayCopy: string,
  daysCopy: string,
) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return null;
  }

  const startUtc = Date.UTC(
    start.getUTCFullYear(),
    start.getUTCMonth(),
    start.getUTCDate(),
  );
  const endUtc = Date.UTC(
    end.getUTCFullYear(),
    end.getUTCMonth(),
    end.getUTCDate(),
  );
  const msInDay = 1000 * 60 * 60 * 24;
  const roundedDiff = Math.round((endUtc - startUtc) / msInDay);
  const duration = Math.max(roundedDiff, 1);
  const durationLabel = duration === 1 ? dayCopy : daysCopy;
  // const durationLabel = duration === 1 ? copy[locale].day : copy[locale].days;

  return `${duration} ${durationLabel}`;
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

  return text.length > 155 ? `${text.slice(0, 152).trimEnd()}...` : text;
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
