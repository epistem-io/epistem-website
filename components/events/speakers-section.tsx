"use client";

import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { useState } from "react";

import { cn } from "@/lib/utils";

const MOBILE_PAGE_SIZE = 3;
const DESKTOP_PAGE_SIZE = 4;

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
  const [mobilePageIndex, setMobilePageIndex] = useState(0);
  const [desktopPageIndex, setDesktopPageIndex] = useState(0);
  const t = useTranslations("EventDetailPage");
  const format = useFormatter();

  if (speakers.length === 0) {
    return null;
  }

  return (
    <section className="space-y-0 border-t-0 border-[#EAECF0]">
      <PaginatedSpeakersLayout
        speakers={speakers}
        pageSize={MOBILE_PAGE_SIZE}
        pageIndex={mobilePageIndex}
        setPageIndex={setMobilePageIndex}
        title={t("speakersTitle")}
        showingRangeLabel={t("showingRange", {
          start: format.number(
            getPageRange(mobilePageIndex, MOBILE_PAGE_SIZE, speakers.length)
              .start,
          ),
          end: format.number(
            getPageRange(mobilePageIndex, MOBILE_PAGE_SIZE, speakers.length)
              .end,
          ),
          total: format.number(speakers.length),
        })}
        previousLabel={t("previousSpeakers")}
        nextLabel={t("nextSpeakers")}
        className="md:hidden"
        headerClassName="items-center justify-between gap-3"
        titleClassName="font-lp-text-s-semibold"
        infoRowClassName="shrink-0 items-center gap-3"
        showingTextClassName="font-lp-text-xs-regular"
        gridClassName="grid-cols-3 gap-3"
        cardClassName="space-y-2"
        imageWrapperClassName="aspect-square rounded-[5px]"
        imageSizes="(max-width: 639px) 33vw, 120px"
        textWrapperClassName="space-y-0"
        nameClassName="font-lp-text-xs-semibold text-text-icons-base-main"
        titleTextClassName="font-lp-text-xs-regular text-text-icons-base-third"
        paginationButtonClassName="size-6"
        iconClassName="size-3.5"
      />

      <PaginatedSpeakersLayout
        speakers={speakers}
        pageSize={DESKTOP_PAGE_SIZE}
        pageIndex={desktopPageIndex}
        setPageIndex={setDesktopPageIndex}
        title={t("speakersTitle")}
        showingRangeLabel={t("showingRange", {
          start: format.number(
            getPageRange(desktopPageIndex, DESKTOP_PAGE_SIZE, speakers.length)
              .start,
          ),
          end: format.number(
            getPageRange(desktopPageIndex, DESKTOP_PAGE_SIZE, speakers.length)
              .end,
          ),
          total: format.number(speakers.length),
        })}
        previousLabel={t("previousSpeakers")}
        nextLabel={t("nextSpeakers")}
        className="hidden md:block"
        headerClassName="flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        titleClassName="font-lp-headline-xs-bold"
        infoRowClassName="items-center justify-between gap-4 sm:justify-end sm:gap-6"
        showingTextClassName="font-lp-text-s-regular"
        gridClassName="grid-cols-1 gap-5 sm:grid-cols-4 xl:grid-cols-4"
        cardClassName="space-y-2.5"
        imageWrapperClassName="aspect-[144/177] rounded-[3px]"
        imageSizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 144px"
        textWrapperClassName="space-y-0.5"
        nameClassName="font-lp-text-s-semibold text-text-icons-base-main"
        titleTextClassName="font-lp-text-s-regular text-text-icons-base-second"
        paginationButtonClassName="size-8"
        iconClassName="size-4"
      />
    </section>
  );
}

type PaginatedSpeakersLayoutProps = {
  speakers: SpeakerItem[];
  pageSize: number;
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  title: string;
  showingRangeLabel: string;
  previousLabel: string;
  nextLabel: string;
  className?: string;
  headerClassName: string;
  titleClassName: string;
  infoRowClassName: string;
  showingTextClassName: string;
  gridClassName: string;
  cardClassName: string;
  imageWrapperClassName: string;
  imageSizes: string;
  textWrapperClassName: string;
  nameClassName: string;
  titleTextClassName: string;
  paginationButtonClassName: string;
  iconClassName: string;
};

function PaginatedSpeakersLayout({
  speakers,
  pageSize,
  pageIndex,
  setPageIndex,
  title,
  showingRangeLabel,
  previousLabel,
  nextLabel,
  className,
  headerClassName,
  titleClassName,
  infoRowClassName,
  showingTextClassName,
  gridClassName,
  cardClassName,
  imageWrapperClassName,
  imageSizes,
  textWrapperClassName,
  nameClassName,
  titleTextClassName,
  paginationButtonClassName,
  iconClassName,
}: PaginatedSpeakersLayoutProps) {
  const totalPages = Math.ceil(speakers.length / pageSize);
  const hasPagination = totalPages > 1;
  const safePageIndex = Math.min(pageIndex, Math.max(totalPages - 1, 0));
  const startIndex = safePageIndex * pageSize;
  const visibleSpeakers = speakers.slice(startIndex, startIndex + pageSize);

  return (
    <div className={className}>
      <div className={cn("flex", headerClassName)}>
        <h2 className={cn(titleClassName, "text-text-icons-base-main")}>
          {title}
        </h2>

        <div className={cn("flex", infoRowClassName)}>
          <p
            className={cn(showingTextClassName, "text-text-icons-base-second")}
          >
            {showingRangeLabel}
          </p>

          {hasPagination ? (
            <div className="flex items-center gap-2">
              <PaginationButton
                label={previousLabel}
                disabled={safePageIndex === 0}
                onClick={() => setPageIndex((currentPage) => currentPage - 1)}
                className={paginationButtonClassName}
              >
                <ChevronLeftIcon className={iconClassName} />
              </PaginationButton>
              <PaginationButton
                label={nextLabel}
                disabled={safePageIndex === totalPages - 1}
                onClick={() => setPageIndex((currentPage) => currentPage + 1)}
                className={paginationButtonClassName}
              >
                <ChevronRightIcon className={iconClassName} />
              </PaginationButton>
            </div>
          ) : null}
        </div>
      </div>

      <div className={cn("mt-6 grid", gridClassName)}>
        {visibleSpeakers.map((speaker) => (
          <article
            key={`${speaker.name}-${speaker.title}`}
            className={cardClassName}
          >
            <div
              className={cn(
                "relative overflow-hidden bg-[#F5F5F5]",
                imageWrapperClassName,
              )}
            >
              <Image
                src={speaker.imageSrc}
                alt={speaker.imageAlt}
                fill
                className="object-cover"
                sizes={imageSizes}
              />
            </div>

            <div className={textWrapperClassName}>
              <p className={nameClassName}>{speaker.name}</p>
              <p className={titleTextClassName}>{speaker.title}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
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

type PaginationButtonProps = {
  children: React.ReactNode;
  disabled: boolean;
  label: string;
  onClick: () => void;
  className?: string;
};

function PaginationButton({
  children,
  disabled,
  label,
  onClick,
  className,
}: PaginationButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-[#EAECF0] bg-white text-text-icons-base-main transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-pink focus-visible:ring-offset-2",
        className,
        disabled
          ? "cursor-not-allowed text-[#B7BDC4]"
          : "hover:border-primary-pink hover:text-primary-pink",
      )}
    >
      {children}
    </button>
  );
}
