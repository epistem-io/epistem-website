"use client";

import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react";
import {
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type TouchEvent as ReactTouchEvent,
  useEffect,
  useId,
  useState,
} from "react";

import { cn } from "@/lib/utils";

type EventImageCarouselProps = {
  title: string;
  images: {
    src: string;
    alt: string;
  }[];
};

export function EventImageCarousel({
  title,
  images,
}: EventImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const carouselLabelId = useId();

  const hasMultipleImages = images.length > 1;
  const safeActiveIndex =
    images.length === 0 ? 0 : Math.min(activeIndex, images.length - 1);
  const activeImage = images[safeActiveIndex];

  const goToIndex = (index: number) => {
    setActiveIndex(index);
  };

  const goToPrevious = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? images.length - 1 : currentIndex - 1,
    );
  };

  const goToNext = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === images.length - 1 ? 0 : currentIndex + 1,
    );
  };

  useEffect(() => {
    if (!isLightboxOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLightboxOpen(false);
      }

      if (hasMultipleImages && event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveIndex((currentIndex) =>
          currentIndex === 0 ? images.length - 1 : currentIndex - 1,
        );
      }

      if (hasMultipleImages && event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((currentIndex) =>
          currentIndex === images.length - 1 ? 0 : currentIndex + 1,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [hasMultipleImages, images.length, isLightboxOpen]);

  const handleImageKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsLightboxOpen(true);
    }
  };

  const handleTouchStart = (event: ReactTouchEvent<HTMLElement>) => {
    if (!hasMultipleImages) return;
    setTouchStartX(event.touches[0]?.clientX ?? null);
  };

  const handleTouchEnd = (event: ReactTouchEvent<HTMLElement>) => {
    if (!hasMultipleImages || touchStartX === null) return;

    const touchEndX = event.changedTouches[0]?.clientX;

    if (typeof touchEndX !== "number") {
      setTouchStartX(null);
      return;
    }

    const deltaX = touchStartX - touchEndX;

    if (Math.abs(deltaX) > 48) {
      if (deltaX > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }

    setTouchStartX(null);
  };

  if (!activeImage) return null;

  return (
    <>
      <div
        className="space-y-3"
        aria-labelledby={carouselLabelId}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <p id={carouselLabelId} className="sr-only">
          {title} image gallery
        </p>

        <div className="relative">
          <button
            type="button"
            className="group relative block w-full overflow-hidden rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-pink focus-visible:ring-offset-2"
            onClick={() => setIsLightboxOpen(true)}
            onKeyDown={handleImageKeyDown}
            aria-label={`Open ${activeImage.alt} in fullscreen`}
          >
            <div className="relative aspect-[778/406] overflow-hidden rounded-xl bg-[#F5F5F5]">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                priority
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 778px"
              />
            </div>
          </button>

          {hasMultipleImages ? (
            <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-center justify-between sm:inset-x-5 sm:bottom-5">
              <CarouselArrow
                direction="previous"
                onClick={() => goToPrevious()}
                className="pointer-events-auto"
              />
              <CarouselArrow
                direction="next"
                onClick={() => goToNext()}
                className="pointer-events-auto"
              />
            </div>
          ) : null}
        </div>

        {hasMultipleImages ? (
          <div
            className="flex gap-3 overflow-x-auto pb-1"
            role="tablist"
            aria-label={`${title} image thumbnails`}
          >
            {images.map((image, index) => {
              const isActive = index === safeActiveIndex;

              return (
                <button
                  key={`${image.src}-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Show image ${index + 1} of ${images.length}`}
                  className={cn(
                    "relative h-[98px] w-[146px] shrink-0 overflow-hidden rounded-xl bg-[#F5F5F5] transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-pink focus-visible:ring-offset-2",
                    isActive ? "opacity-100" : "opacity-45 hover:opacity-70",
                  )}
                  onClick={() => goToIndex(index)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="146px"
                  />
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      {isLightboxOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} fullscreen image viewer`}
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 inline-flex size-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:right-6 sm:top-6"
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close fullscreen gallery"
          >
            <XIcon className="size-5" />
          </button>

          {hasMultipleImages ? (
            <>
              <CarouselArrow
                direction="previous"
                onClick={(event) => {
                  event.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white sm:left-6"
                lightbox
              />
              <CarouselArrow
                direction="next"
                onClick={(event) => {
                  event.stopPropagation();
                  goToNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white sm:right-6"
                lightbox
              />
            </>
          ) : null}

          <div
            className="relative flex max-h-full w-full max-w-6xl flex-col items-center gap-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative flex max-h-[80vh] w-full items-center justify-center overflow-hidden rounded-2xl">
              <div className="relative aspect-[778/406] max-h-[80vh] w-full">
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
            </div>

            {hasMultipleImages ? (
              <p className="font-lp-text-m-medium text-white/80">
                {safeActiveIndex + 1} / {images.length}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

type CarouselArrowProps = {
  direction: "previous" | "next";
  onClick: (event: ReactMouseEvent<HTMLButtonElement>) => void;
  className?: string;
  lightbox?: boolean;
};

function CarouselArrow({
  direction,
  onClick,
  className,
  lightbox = false,
}: CarouselArrowProps) {
  const isPrevious = direction === "previous";
  const Icon = isPrevious ? ChevronLeftIcon : ChevronRightIcon;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrevious ? "Show previous image" : "Show next image"}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-full bg-white/60 text-text-icons-base-main shadow-[0_4px_12px_rgba(0,0,0,0.08)] backdrop-blur-[2px] transition hover:bg-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-pink focus-visible:ring-offset-2",
        lightbox &&
          "bg-white/15 text-white shadow-none hover:bg-white/25 focus-visible:ring-white focus-visible:ring-offset-0",
        className,
      )}
    >
      <Icon className="size-5" />
    </button>
  );
}
