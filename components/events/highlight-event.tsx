import { ArrowRightIcon, CalendarDaysIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import type { Event } from "@/payload-types";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { formatEventDateRange, formatEventLocation } from "@/lib/events";

type HighlightEventProps = {
  event: Event;
  locale: "en" | "id";
};

const copy = {
  en: {
    eyebrow: "Upcoming Event",
    cta: "See Event Detail",
  },
  id: {
    eyebrow: "Acara Mendatang",
    cta: "Lihat Detail Acara",
  },
} as const;

export function HighlightEvent({ event, locale }: HighlightEventProps) {
  const heroImage =
    typeof event.heroImage === "object" && event.heroImage?.url
      ? event.heroImage.url
      : "/images/collage.webp";

  const description = getEventSummary(event);

  return (
    <article className="overflow-hidden rounded-[20px] bg-primary-red-pink-light p-4 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-6">
        <div className="relative h-[240px] overflow-hidden rounded-[12px] lg:order-2 lg:h-auto lg:w-[480px] lg:shrink-0">
          <Image
            src={heroImage}
            alt={event.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 480px"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <p className="font-lp-text-xl-bold text-primary-pink">
            {copy[locale].eyebrow}
          </p>

          <div className="mt-4 flex flex-1 flex-col">
            <h2 className="font-lp-headline-l-semibold text-custom-text-grey-dark">
              {event.title}
            </h2>

            {description ? (
              <p className="mt-6 max-w-[650px] font-lp-text-xl-regular text-text-icons-base-main">
                {description}
              </p>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-4">
              <MetadataChip
                icon={<CalendarDaysIcon className="size-6 text-primary-pink" />}
                title={formatEventDateRange(
                  event.startDate,
                  event.endDate,
                  locale,
                )}
              />
              <MetadataChip
                icon={<MapPinIcon className="size-6 text-primary-pink" />}
                title={formatEventLocation(
                  event.locationDetail,
                  event.locationGeneral,
                )}
              />
            </div>

            <div className="mt-6 lg:mt-6">
              <Button
                asChild
                variant="primary"
                className="font-text-button-semibold-large h-auto rounded-[8px] px-5 py-3 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)]"
              >
                <Link href={`/events/${event.slug}`}>
                  {copy[locale].cta}
                  <ArrowRightIcon className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
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
    <div className="min-w-[220px] flex-1 rounded-[16px] border border-primary-red-pink-light-active bg-[#fff6f9] p-4 lg:min-w-[0] lg:flex-none">
      <div className="flex items-start gap-3">
        <div className="shrink-0">{icon}</div>
        <div className="min-w-0">
          <p className="font-lp-headline-xxs-bold text-text-icons-base-second">
            {title}
          </p>
          {subtitle ? (
            <p className="font-lp-text-s-regular text-text-icons-base-second">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function getEventSummary(event: Event) {
  // return "Event summary";

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
