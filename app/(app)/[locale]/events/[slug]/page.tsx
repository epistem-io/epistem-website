import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPinIcon, PlayIcon } from "lucide-react";

import { EventImageCarousel } from "@/components/events/event-image-carousel";
import { AgendaSection } from "@/components/events/agenda-section";
import { EventRichText } from "@/components/events/event-rich-text";
import { FileDownload } from "@/components/events/file-download";
import { SpeakersSection } from "@/components/events/speakers-section";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "@/i18n/navigation";
import { getEventBySlug } from "@/lib/events";
import {
  formatEventDateRange,
  formatEventLocation,
} from "@/lib/event-formatting";
import type { Document, Media } from "@/payload-types";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{
    locale: "en" | "id";
    slug: string;
  }>;
};

export default async function EventDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const t = await getTranslations("EventDetailPage");
  const event = await getEventBySlug(slug, locale);

  if (!event) notFound();

  const heroImage =
    typeof event.heroImage === "object" && event.heroImage?.url
      ? event.heroImage.url
      : "/images/collage.webp";

  const galleryImages =
    event.images
      ?.map((entry, index) => {
        const image = typeof entry.image === "object" ? entry.image : null;

        return getGalleryImage({
          image,
          eventTitle: event.title,
          index,
        });
      })
      .filter((image): image is { src: string; alt: string } =>
        Boolean(image),
      ) || [];
  const hasDownloads = (event.downloads?.length ?? 0) > 0;
  const previewLink = await getPreviewLink(event.previewYoutubeUrl);
  const speakers =
    event.speakers
      ?.map((speaker) => {
        const profilePhoto =
          typeof speaker.profilePhoto === "object"
            ? speaker.profilePhoto
            : null;

        return getSpeakerCard({
          image: profilePhoto,
          name: speaker.name,
          title: speaker.title,
        });
      })
      .filter(
        (
          speaker,
        ): speaker is {
          imageSrc: string;
          imageAlt: string;
          name: string;
          title: string;
        } => Boolean(speaker),
      ) ?? [];
  const agendas =
    event.agendas
      ?.map((agenda) => getAgendaItem(agenda))
      .filter(
        (
          agenda,
        ): agenda is {
          title: string;
          description: string;
          time: string;
        } => Boolean(agenda),
      ) ?? [];

  return (
    <main className="relative overflow-hidden bg-white pb-20 pt-[120px]">
      <div className="absolute inset-x-0 top-0 h-[350px] md:h-[494px] bg-[#FAEDF2]" />

      <section className="base-container relative z-10 mx-auto flex w-full flex-col px-2">
        <Breadcrumb className="hidden md:block">
          <BreadcrumbList className="gap-1 text-[15px] leading-[22px]">
            <BreadcrumbItem>
              <BreadcrumbLink
                asChild
                className="font-aptos font-semibold text-text-icons-base-second hover:text-primary-pink"
              >
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-text-icons-base-second">
              /
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink
                asChild
                className="font-aptos font-semibold text-text-icons-base-second hover:text-primary-pink"
              >
                <Link href="/events">Events</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-text-icons-base-second">
              /
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-aptos font-semibold text-primary-pink">
                {event.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {event.featured && (
          <p className="font-lp-text-xs-semibold text-primary-pink md:font-lp-text-xl-bold text-center md:text-left md:pt-10">
            Upcoming Event
          </p>
        )}

        <h1 className="mt-3 md:mt-6 max-w-[862px] font-lp-headline-xxs-bold md:font-lp-headline-xl-bold text-text-icons-base-main md:text-balance text-center md:text-left">
          {event.title}
        </h1>

        <div className="mt-6 md:mt-8 rounded-2xl md:bg-white px-5 py-5 shadow-[0_8px_24px_rgba(37,37,37,0.04)] sm:px-6 sm:py-6 lg:mt-10 lg:px-9 lg:py-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-6 md:gap-12">
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
                  <p className="font-lp-text-l-semibold text-gray-dark">
                    {formatEventDateRange(
                      event.startDate,
                      event.endDate,
                      locale,
                    )}
                  </p>
                  <div className="flex items-center gap-1 text-gray-dark">
                    <MapPinIcon className="size-5 shrink-0" />
                    <span className="font-lp-text-l-semibold">
                      {formatEventLocation(
                        event.locationDetail,
                        event.locationGeneral,
                      )}
                    </span>
                  </div>
                </div>

                {galleryImages.length > 0 ? (
                  <EventImageCarousel
                    title={event.title}
                    images={galleryImages}
                  />
                ) : (
                  <div className="relative aspect-[778/406] overflow-hidden rounded-xl">
                    <Image
                      src={heroImage}
                      alt={event.title}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 778px"
                    />
                  </div>
                )}

                <div className="space-y-6 pt-0">
                  <h2 className="font-lp-text-s-semibold md:font-lp-headline-xs-bold text-text-icons-base-main">
                    {t("aboutThisEvent")}
                  </h2>
                  <EventRichText content={event.content} />
                </div>

                <SpeakersSection speakers={speakers} />

                <AgendaSection agendas={agendas} />
              </div>
            </div>

            <div className="w-full shrink-0 lg:w-[382px]">
              <aside className="space-y-6">
                {hasDownloads ? (
                  <section className="rounded-2xl md:border md:border-[#EAECF0] md:bg-white md:p-4">
                    <h2 className="font-lp-text-s-semibold md:font-lp-text-xl-bold text-text-icons-base-main">
                      Documents
                    </h2>
                    <div className="mt-6 space-y-4">
                      {event.downloads?.map((download) => {
                        const file =
                          typeof download.file === "object"
                            ? download.file
                            : null;

                        return (
                          <FileDownload
                            key={download.id}
                            href={file?.url || "#"}
                            filename={download.label}
                            filesize={file?.filesize}
                            filetype={getFileTypeLabel(file)}
                            compact
                          />
                        );
                      })}
                    </div>
                  </section>
                ) : null}

                {previewLink ? (
                  <section className="rounded-2xl md:border md:border-[#EAECF0] md:bg-white md:p-4">
                    <h2 className="font-lp-text-s-semibold md:font-lp-text-xl-bold text-text-icons-base-main">
                      Links
                    </h2>
                    {previewLink.title ? (
                      <div className="pt-2">
                        <p className="line-clamp-2 font-lp-body-m-semibold text-text-icons-base-main">
                          {previewLink.title}
                        </p>
                      </div>
                    ) : null}
                    <a
                      href={previewLink.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={
                        previewLink.title
                          ? `Watch ${previewLink.title} on YouTube`
                          : `Watch preview video for ${event.title} on YouTube`
                      }
                      className="group mt-6 block overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-pink focus-visible:ring-offset-2"
                    >
                      <div className="relative aspect-video overflow-hidden rounded-2xl bg-[#FAEDF2]">
                        <Image
                          src={previewLink.thumbnailUrl}
                          alt={`YouTube video thumbnail for ${event.title}`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          sizes="(max-width: 1024px) 100vw, 350px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex size-14 items-center justify-center rounded-full bg-white/90 text-[#111A13] shadow-lg transition-transform duration-300 group-hover:scale-105">
                            <PlayIcon className="ml-1 size-6 fill-current" />
                          </div>
                        </div>
                        <span className="sr-only">
                          {previewLink.title
                            ? `Watch ${previewLink.title} on YouTube`
                            : `Watch preview video for ${event.title} on YouTube`}
                        </span>
                      </div>
                    </a>
                  </section>
                ) : null}

                {/* <section className="rounded-2xl border border-[#EAECF0] bg-white p-4">
                  <div className="flex items-center justify-center gap-3 py-1">
                    <Share2Icon className="size-6 shrink-0 text-[#111A13]" />
                    <p className="font-text-button-semibold-small text-[#111A13]">
                      Share this event
                    </p>
                  </div>
                </section> */}
              </aside>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function getFileTypeLabel(file: Document | null) {
  const mimeType = file?.mimeType?.split("/")[1];

  if (mimeType) {
    return mimeType.toUpperCase();
  }

  const extension = file?.filename?.split(".").pop();

  return extension?.toUpperCase() || "FILE";
}

type PreviewLink = {
  href: string;
  videoId: string;
  thumbnailUrl: string;
  title: string | null;
};

async function getPreviewLink(
  value: string | null | undefined,
): Promise<PreviewLink | null> {
  if (!value) return null;

  try {
    const url = new URL(value);
    const hostname = url.hostname.replace(/^www\./, "");
    let videoId: string | null = null;

    if (
      hostname === "youtube.com" ||
      hostname === "m.youtube.com" ||
      hostname === "youtube-nocookie.com"
    ) {
      if (url.pathname === "/watch") {
        videoId = url.searchParams.get("v");
      }
    }

    if (hostname === "youtu.be") {
      videoId = url.pathname.split("/").filter(Boolean)[0] ?? null;
    }

    if (!videoId) return null;

    const href = `https://www.youtube.com/watch?v=${videoId}`;

    return {
      href,
      videoId,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      title: await getYouTubeVideoTitle(href),
    };
  } catch {
    return null;
  }
}

async function getYouTubeVideoTitle(href: string) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);

  try {
    const oembedUrl = new URL("https://www.youtube.com/oembed");
    oembedUrl.searchParams.set("url", href);
    oembedUrl.searchParams.set("format", "json");

    const response = await fetch(oembedUrl, {
      signal: controller.signal,
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;

    const data = (await response.json()) as { title?: unknown };

    return typeof data.title === "string" && data.title.trim()
      ? data.title.trim()
      : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

function getGalleryImage({
  image,
  eventTitle,
  index,
}: {
  image: Media | null;
  eventTitle: string;
  index: number;
}) {
  if (!image?.url) return null;

  return {
    src: image.url,
    alt: image.alt?.trim() || `${eventTitle} image ${index + 1}`,
  };
}

function getSpeakerCard({
  image,
  name,
  title,
}: {
  image: Media | null;
  name: string | null | undefined;
  title: string | null | undefined;
}) {
  const trimmedName = name?.trim();
  const trimmedTitle = title?.trim();

  if (!image?.url || !trimmedName || !trimmedTitle) {
    return null;
  }

  return {
    imageSrc: image.url,
    imageAlt: image.alt?.trim() || trimmedName,
    name: trimmedName,
    title: trimmedTitle,
  };
}

function getAgendaItem(agenda: {
  title: string | null | undefined;
  description: string | null | undefined;
  time: string | null | undefined;
}) {
  const title = agenda.title?.trim();
  const description = agenda.description?.trim();
  const time = agenda.time?.trim();

  if (!title || !description || !time) {
    return null;
  }

  return {
    title,
    description,
    time,
  };
}
