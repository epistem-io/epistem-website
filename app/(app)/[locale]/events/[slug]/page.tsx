import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPinIcon, Share2Icon } from "lucide-react";

import { EventImageCarousel } from "@/components/events/event-image-carousel";
import { EventRichText } from "@/components/events/event-rich-text";
import { FileDownload } from "@/components/events/file-download";
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
import type { Document, Media } from "@/payload-types";

type Props = {
  params: Promise<{
    locale: "en" | "id";
    slug: string;
  }>;
};

export default async function EventDetailPage({ params }: Props) {
  const { locale, slug } = await params;
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
      .filter((image): image is { src: string; alt: string } => Boolean(image)) ||
    [];
  const hasDownloads = (event.downloads?.length ?? 0) > 0;
  const previewLink = getPreviewLink(event.previewYoutubeUrl);

  return (
    <main className="relative overflow-hidden bg-white pb-20 pt-[120px]">
      <div className="absolute inset-x-0 top-0 h-[320px] bg-[#FAEDF2]" />

      <section className="base-container relative z-10 mx-auto flex w-full flex-col px-2">
        <Breadcrumb>
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

        <h1 className="mt-8 max-w-[862px] font-lp-headline-xl-bold text-text-icons-base-main md:text-balance">
          {event.title}
        </h1>

        <div className="mt-8 rounded-2xl bg-white px-5 py-5 shadow-[0_8px_24px_rgba(37,37,37,0.04)] sm:px-6 sm:py-6 lg:mt-10 lg:px-9 lg:py-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
                  <p className="font-lp-text-l-semibold text-gray-dark">
                    {new Date(event.eventDate).toLocaleDateString(
                      locale === "id" ? "id-ID" : "en-US",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      },
                    )}
                  </p>
                  <div className="flex items-center gap-1 text-gray-dark">
                    <MapPinIcon className="size-5 shrink-0" />
                    <span className="font-lp-text-l-semibold">
                      {event.location}
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

                <div className="space-y-6 pt-1">
                  <EventRichText content={event.content} />
                </div>
              </div>
            </div>

            <div className="w-full shrink-0 lg:w-[382px]">
              <aside className="space-y-6">
                {hasDownloads ? (
                  <section className="rounded-2xl border border-[#EAECF0] bg-white p-4">
                    <h2 className="font-lp-text-xl-bold text-text-icons-base-main">
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
                  <section className="rounded-2xl border border-[#EAECF0] bg-white p-4">
                    <h2 className="font-lp-text-xl-bold text-text-icons-base-main">
                      Links
                    </h2>
                    <a
                      href={previewLink.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 block break-all font-lp-body-l-semibold text-[#111A13] underline decoration-[#111A13] underline-offset-[3px] transition-colors hover:text-primary-pink hover:decoration-primary-pink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-pink focus-visible:ring-offset-2"
                    >
                      {previewLink.label}
                    </a>
                  </section>
                ) : null}

                <section className="rounded-2xl border border-[#EAECF0] bg-white p-4">
                  <div className="flex items-center justify-center gap-3 py-1">
                    <Share2Icon className="size-6 shrink-0 text-[#111A13]" />
                    <p className="font-text-button-semibold-small text-[#111A13]">
                      Share this event
                    </p>
                  </div>
                </section>
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

function getPreviewLink(value: string | null | undefined) {
  if (!value) return null;

  try {
    const url = new URL(value);

    return {
      href: url.toString(),
      label: url.toString().replace(/^https?:\/\//, ""),
    };
  } catch {
    return {
      href: value,
      label: value,
    };
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
