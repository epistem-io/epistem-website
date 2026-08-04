"use client";

import { ArrowRightIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionHead } from "./section-head";
import { HighlightEventsCarousel } from "@/components/events/highlight-events-carousel";
import { PastEvents } from "@/components/events/past-events";
import { Link } from "@/i18n/navigation";
import type { Event } from "@/payload-types";

interface Props {
  locale: "en" | "id";
  featuredEvents: Event[];
  events: Event[];
}

export const EventsSection = ({ locale, featuredEvents, events }: Props) => {
  const t = useTranslations("HomePage.Events");
  const tEventDetail = useTranslations("EventDetailPage");

  return (
    // <section className="base-container flex w-full flex-col items-center px-2 py-6 lg:py-[60px]">
    <section className="base-container flex flex-col items-center justify-start w-full px-2 max-lg:mt-8 lg:my-15 xl:my-20">
      <SectionHead title={t("title")} caption={t("caption")} />

      {featuredEvents.length > 0 ? (
        <div className="mt-10 md:mt-10 lg:mt-12 xl:mt-12 pt-0 md:pt-0 lg:pt-0 w-full ">
          <HighlightEventsCarousel
            events={featuredEvents}
            locale={locale}
            copy={{
              upcomingEvent: tEventDetail("upcomingEvent"),
              featuredEventCta: tEventDetail("featuredEventCta"),
              eventDurationDay: tEventDetail("eventDurationDay"),
              eventDurationDays: tEventDetail("eventDurationDays"),
              previousFeaturedEvents: tEventDetail.has("previousFeaturedEvents")
                ? tEventDetail("previousFeaturedEvents")
                : tEventDetail("previousPastEvents"),
              nextFeaturedEvents: tEventDetail.has("nextFeaturedEvents")
                ? tEventDetail("nextFeaturedEvents")
                : tEventDetail("nextPastEvents"),
            }}
          />
        </div>
      ) : null}

      {events ? (
        <div className="mt-6 w-full">
          <PastEvents
            events={events}
            locale={locale}
            isOverview={true}
            showTitle={featuredEvents.length > 0}
          />
        </div>
      ) : null}

      <div className="hidden mt-3 flex w-full max-w-[1320px] lg:mt-12">
        {/* unnamed classname: blog-base */}
        <article className="flex w-full flex-col overflow-hidden rounded-[12px] bg-[#FFF6F9] lg:min-h-[300px] lg:flex-row lg:rounded-[20px]">
          {/* unnamed classname: event-image-container */}
          <div className="relative h-[300px] w-full shrink-0 overflow-hidden rounded-[12px] lg:w-[480px]">
            <Image
              src="/images/collage.webp"
              alt={t("eventTitle")}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 480px"
              priority={false}
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col justify-center p-3 lg:p-6">
            <div className="flex flex-col gap-3 lg:gap-4">
              <div className="flex items-start justify-between gap-3">
                <p className="shrink-0 text-[10px] font-bold leading-6 font-pjs text-text-icons-base-second lg:font-lp-text-l-semibold">
                  {t("date")}
                </p>
                <Link
                  href="/event/luma-launch"
                  // href={`/events/${event.slug}`}
                  className="flex items-center gap-1.5 text-primary-pink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-pink focus-visible:ring-offset-2 hover:underline"
                >
                  <span className="shrink-0 font-pjs text-right text-[10px] font-bold leading-6 lg:font-lp-text-l-semibold">
                    {t("cta")}
                  </span>
                  <ArrowRightIcon className="size-3.5 lg:size-5" />
                </Link>
              </div>

              <div className="flex flex-col gap-2 lg:gap-3">
                <h3 className="text-gray-dark text-sm font-bold leading-normal track-[-0.21px] lg:font-lp-headline-s-bold">
                  {t("eventTitle")}
                </h3>
                <p className="font-pjs text-xs font-normal text-text-icons-base-main line-clamp-2 text-ellipsis lg:font-lp-text-xl-regular">
                  {t("description")}
                </p>
                <div className="flex items-center gap-1 text-gray-dark">
                  <MapPinIcon className="size-4 shrink-0 lg:size-5" />
                  <span className="font-lp-text-xs-semibold lg:font-lp-text-l-regular">
                    {t("location")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};
