"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

import {
  HighlightEventView,
  type HighlightEventCopy,
} from "@/components/events/highlight-event";
import { cn } from "@/lib/utils";
import type { Event } from "@/payload-types";

type HighlightEventsCarouselProps = {
  events: Event[];
  locale: "en" | "id";
  copy: HighlightEventCopy & {
    previousFeaturedEvents: string;
    nextFeaturedEvents: string;
  };
};

export function HighlightEventsCarousel({
  events,
  locale,
  copy,
}: HighlightEventsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const hasMultiple = events.length > 1;

  // Clones on both ends make the loop seamless: [last, ...events, first].
  const slides = hasMultiple
    ? [
        { event: events[events.length - 1], clone: true, key: "clone-last" },
        ...events.map((event) => ({ event, clone: false, key: `${event.id}` })),
        { event: events[0], clone: true, key: "clone-first" },
      ]
    : events.map((event) => ({ event, clone: false, key: `${event.id}` }));

  const getSlides = () =>
    Array.from(
      trackRef.current?.querySelectorAll<HTMLElement>("[data-highlight-card]") ??
        [],
    );

  const centerOn = useCallback((slide: HTMLElement) => {
    const track = trackRef.current;
    if (!track) return;

    const previousBehavior = track.style.scrollBehavior;
    track.style.scrollBehavior = "auto";
    track.scrollLeft =
      slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2;
    track.style.scrollBehavior = previousBehavior;
  }, []);

  // Start on the first real slide so the last card peeks on the left.
  useLayoutEffect(() => {
    if (!hasMultiple) return;

    const cards = getSlides();
    if (cards.length > 1) {
      centerOn(cards[1]);
    }
  }, [hasMultiple, events, centerOn]);

  // After any scroll settles on a clone, jump (instantly) to its real slide.
  useEffect(() => {
    if (!hasMultiple) return;

    const track = trackRef.current;
    if (!track) return;

    let timer: ReturnType<typeof setTimeout>;

    const normalize = () => {
      const cards = getSlides();
      if (cards.length < 3) return;

      const step = cards[1].offsetLeft - cards[0].offsetLeft;
      const center = track.scrollLeft + track.clientWidth / 2;

      let nearest = 0;
      let bestDistance = Infinity;
      cards.forEach((card, index) => {
        const distance = Math.abs(
          card.offsetLeft + card.offsetWidth / 2 - center,
        );
        if (distance < bestDistance) {
          bestDistance = distance;
          nearest = index;
        }
      });

      const jump = (cards.length - 2) * step;
      const previousBehavior = track.style.scrollBehavior;

      if (nearest === 0) {
        track.style.scrollBehavior = "auto";
        track.scrollLeft += jump;
        track.style.scrollBehavior = previousBehavior;
      } else if (nearest === cards.length - 1) {
        track.style.scrollBehavior = "auto";
        track.scrollLeft -= jump;
        track.style.scrollBehavior = previousBehavior;
      }
    };

    const onScroll = () => {
      clearTimeout(timer);
      timer = setTimeout(normalize, 120);
    };

    track.addEventListener("scroll", onScroll);

    return () => {
      track.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, [hasMultiple, events]);

  const scrollByCards = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.querySelector<HTMLElement>("[data-highlight-card]");
    const gap = parseFloat(getComputedStyle(track).columnGap || "0") || 0;
    const step = firstCard ? firstCard.offsetWidth + gap : track.clientWidth;

    track.scrollBy({ left: step * direction, behavior: "smooth" });
  }, []);

  if (events.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <div
        className={cn(
          hasMultiple && "relative left-1/2 w-screen -translate-x-1/2",
        )}
      >
        <div
          ref={trackRef}
          className={cn(
            "flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory md:gap-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
            hasMultiple &&
              "px-2 md:px-[calc(max(0px,(100vw-1440px)/2)+60px)]",
          )}
        >
          {slides.map(({ event, clone, key }) => (
            <div
              data-highlight-card
              key={key}
              aria-hidden={clone || undefined}
              inert={clone || undefined}
              className={cn(
                "shrink-0",
                hasMultiple
                  ? "snap-center w-full md:w-[1400px] md:max-w-full"
                  : "snap-start mx-auto w-full max-w-[1440px]",
              )}
            >
              <HighlightEventView event={event} locale={locale} copy={copy} />
            </div>
          ))}
        </div>
      </div>

      {hasMultiple ? (
        <div className="mt-4 flex flex-row items-center justify-end gap-3 md:mt-6">
          <button
            type="button"
            aria-label={copy.previousFeaturedEvents}
            onClick={() => scrollByCards(-1)}
            className="flex items-center justify-center size-9 md:size-11 rounded-full bg-text-icons-base-main text-text-icons-on-color transition-colors hover:bg-primary-pink hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-pink focus-visible:ring-offset-2"
          >
            <ChevronLeftIcon className="size-4 md:size-5" />
          </button>
          <button
            type="button"
            aria-label={copy.nextFeaturedEvents}
            onClick={() => scrollByCards(1)}
            className="flex items-center justify-center size-9 md:size-11 rounded-full bg-text-icons-base-main text-text-icons-on-color transition-colors hover:bg-primary-pink hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-pink focus-visible:ring-offset-2"
          >
            <ChevronRightIcon className="size-4 md:size-5" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
