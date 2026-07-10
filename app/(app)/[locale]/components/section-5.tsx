"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useCallback, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { SectionHead } from "./section-head";
import storyArray from "@/data/stories.json";

const QuoteIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <path d="M16 6C17.0609 6 18.0783 6.42143 18.8284 7.17157C19.5786 7.92172 20 8.93913 20 10V22C20 23.0609 19.5786 24.0783 18.8284 24.8284C18.0783 25.5786 17.0609 26 16 26C15.4696 26 14.9609 26.2107 14.5858 26.5858C14.2107 26.9609 14 27.4696 14 28V30C14 31.0609 14.4214 32.0783 15.1716 32.8284C15.9217 33.5786 16.9391 34 18 34C18.5304 34 19.0391 34.2107 19.4142 34.5858C19.7893 34.9609 20 35.4696 20 36V40C20 40.5304 19.7893 41.0391 19.4142 41.4142C19.0391 41.7893 18.5304 42 18 42C14.8174 42 11.7652 40.7357 9.51472 38.4853C7.26428 36.2348 6 33.1826 6 30V10C6 8.93913 6.42143 7.92172 7.17157 7.17157C7.92172 6.42143 8.93913 6 10 6H16Z" stroke="#CC4778" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M38 6C39.0609 6 40.0783 6.42143 40.8284 7.17157C41.5786 7.92172 42 8.93913 42 10V22C42 23.0609 41.5786 24.0783 40.8284 24.8284C40.0783 25.5786 39.0609 26 38 26C37.4696 26 36.9609 26.2107 36.5858 26.5858C36.2107 26.9609 36 27.4696 36 28V30C36 31.0609 36.4214 32.0783 37.1716 32.8284C37.9217 33.5786 38.9391 34 40 34C40.5304 34 41.0391 34.2107 41.4142 34.5858C41.7893 34.9609 42 35.4696 42 36V40C42 40.5304 41.7893 41.0391 41.4142 41.4142C41.0391 41.7893 40.5304 42 40 42C36.8174 42 33.7652 40.7357 31.5147 38.4853C29.2643 36.2348 28 33.1826 28 30V10C28 8.93913 28.4214 7.92172 29.1716 7.17157C29.9217 6.42143 30.9391 6 32 6H38Z" stroke="#CC4778" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
);

export const Section5 = () => {
  const t = useTranslations("HomePage.Section5");
  const locale = useLocale() as "en" | "id";

  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCards = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.querySelector<HTMLElement>("[data-story-card]");
    const gap = parseFloat(getComputedStyle(track).columnGap || "0") || 0;
    const step = firstCard ? firstCard.offsetWidth + gap : track.clientWidth;

    track.scrollBy({ left: step * direction, behavior: "smooth" });
  }, []);

  return (
    <div className="base-container flex flex-col items-center justify-start w-full px-2 max-lg:mt-8 lg:my-15 xl:my-20">
      <SectionHead
        title={
          { en: "Our Stories", id: "Cerita Kami" }[locale]
        }
        caption={
          {
            en: "Voices from the people shaping better mapping and better landscapes.",
            id: "Suara dari para pihak yang membentuk bentang lahan yang lebih baik melalui pemetaan.",
          }[locale]
        }
      />

      <div className="w-full relative mt-8 lg:mt-12">
        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row gap-4 lg:gap-6 lg:overflow-x-auto lg:scroll-smooth lg:snap-x lg:snap-mandatory lg:pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {storyArray.map((item, index) => (
            <article
              data-story-card
              key={`story-${index}`}
              className="lg:snap-start shrink-0 w-full lg:w-[calc(33.333%-16px)] flex flex-col rounded-[20px] bg-gradient-to-br from-primary-red-pink-light to-[#F7E3EB] p-5 lg:p-7 lg:min-h-[360px]"
            >
              <div className="flex flex-row lg:flex-col items-start gap-4 lg:gap-0 grow">
                <QuoteIcon />

                <p className="lg:mt-7 font-pjs text-sm lg:font-lp-text-l-regular xl:font-lp-text-xl-regular text-text-icons-base-main text-justify leading-relaxed grow">
                  {item.quote[locale]}
                </p>
              </div>

              <hr className="my-4 lg:my-5 border-0 border-t border-primary-pink/25" />

              <div className="flex flex-row items-end justify-between gap-3">
                <div className="flex flex-col min-w-0">
                  <p className="font-pjs text-sm lg:text-base font-bold text-primary-pink truncate">
                    {item.name}
                  </p>
                  <p className="font-pjs text-xs lg:text-sm font-normal text-text-icons-base-second">
                    {item.role[locale]}
                  </p>
                </div>

                <Button
                  asChild
                  variant="outline"
                  className="shrink-0 rounded-full border-transparent bg-white text-primary-pink hover:bg-white hover:text-primary-pink-active shadow-sm font-pjs text-xs lg:text-sm font-bold h-auto px-4 py-2"
                >
                  <a href={item.url} target="_blank" rel="noreferrer">
                    See more
                  </a>
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="hidden lg:flex flex-row items-center justify-end gap-3 mt-6">
          <button
            type="button"
            aria-label={t("previous")}
            onClick={() => scrollByCards(-1)}
            className="flex items-center justify-center size-11 lg:size-13 rounded-full bg-text-icons-base-main text-text-icons-on-color transition-colors hover:bg-primary-pink hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-pink focus-visible:ring-offset-2"
          >
            <ChevronLeftIcon className="size-5 lg:size-6" />
          </button>
          <button
            type="button"
            aria-label={t("next")}
            onClick={() => scrollByCards(1)}
            className="flex items-center justify-center size-11 lg:size-13 rounded-full bg-text-icons-base-main text-text-icons-on-color transition-colors hover:bg-primary-pink hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-pink focus-visible:ring-offset-2"
          >
            <ChevronRightIcon className="size-5 lg:size-6" />
          </button>
        </div>
      </div>
    </div>
  );
};