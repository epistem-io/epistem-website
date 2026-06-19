"use client";

import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { useState } from "react";

import { cn } from "@/lib/utils";

const PAGE_SIZE = 4;

type SpeakerItem = {
  imageSrc: string;
  imageAlt: string;
  name: string;
  title: string;
};

type SpeakersSectionProps = {
  speakers: SpeakerItem[];
};

export function SpeakersSection({ speakers }: SpeakersSectionProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const t = useTranslations("EventDetailPage");
  const format = useFormatter();

  const totalPages = Math.ceil(speakers.length / PAGE_SIZE);
  const hasPagination = totalPages > 1;
  const safePageIndex = Math.min(pageIndex, Math.max(totalPages - 1, 0));
  const startIndex = safePageIndex * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, speakers.length);
  const visibleSpeakers = speakers.slice(startIndex, endIndex);

  if (speakers.length === 0) {
    return null;
  }

  const showingText = t("showingRange", {
    start: format.number(startIndex + 1),
    end: format.number(endIndex),
    total: format.number(speakers.length),
  });

  return (
    <section className="space-y-6 border-t border-[#EAECF0] pt-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="font-lp-headline-xs-bold text-text-icons-base-main">
          {t("speakersTitle")}
        </h2>

        <div className="flex items-center justify-between gap-4 sm:justify-end sm:gap-6">
          <p className="font-lp-text-s-regular text-text-icons-base-second">
            {showingText}
          </p>

          {hasPagination ? (
            <div className="flex items-center gap-2">
              <PaginationButton
                label={t("previousSpeakers")}
                disabled={safePageIndex === 0}
                onClick={() => setPageIndex((currentPage) => currentPage - 1)}
              >
                <ChevronLeftIcon className="size-4" />
              </PaginationButton>
              <PaginationButton
                label={t("nextSpeakers")}
                disabled={safePageIndex === totalPages - 1}
                onClick={() => setPageIndex((currentPage) => currentPage + 1)}
              >
                <ChevronRightIcon className="size-4" />
              </PaginationButton>
            </div>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {visibleSpeakers.map((speaker) => (
          <article key={`${speaker.name}-${speaker.title}`} className="space-y-2.5">
            <div className="relative aspect-[144/177] overflow-hidden rounded-[3px] bg-[#F5F5F5]">
              <Image
                src={speaker.imageSrc}
                alt={speaker.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 144px"
              />
            </div>

            <div className="space-y-0.5">
              <p className="font-lp-text-s-semibold text-text-icons-base-main">
                {speaker.name}
              </p>
              <p className="font-lp-text-s-regular text-text-icons-base-second">
                {speaker.title}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

type PaginationButtonProps = {
  children: React.ReactNode;
  disabled: boolean;
  label: string;
  onClick: () => void;
};

function PaginationButton({
  children,
  disabled,
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
        "inline-flex size-8 items-center justify-center rounded-full border border-[#EAECF0] bg-white text-text-icons-base-main transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-pink focus-visible:ring-offset-2",
        disabled
          ? "cursor-not-allowed text-[#B7BDC4]"
          : "hover:border-primary-pink hover:text-primary-pink",
      )}
    >
      {children}
    </button>
  );
}
