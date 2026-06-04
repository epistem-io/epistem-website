import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPinIcon } from "lucide-react";

import { FileDownload } from "@/components/events/file-download";
import { RelatedEvents } from "@/components/events/related-events";
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

  const relatedItems =
    event.relatedEvents?.map((item: any) => ({
      title: item.title,
      meta: item.location,
      img:
        typeof item.heroImage === "object" && item.heroImage?.url
          ? item.heroImage.url
          : "/images/collage.webp",
      url: `/events/${item.slug}`,
    })) || [];

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

                <div className="relative aspect-[500/261] overflow-hidden rounded-xl">
                  <Image
                    src={heroImage}
                    alt={event.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 778px"
                  />
                </div>

                <div className="space-y-6 pt-1">
                  <div className="font-lp-body-m-regular text-justify text-text-icons-base-second">
                    {"root" in event.content
                      ? JSON.stringify(event.content)
                      : null}
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {event.downloads?.map((download: any) => (
                  <FileDownload
                    key={download.id}
                    href={
                      typeof download.file === "object"
                        ? download.file.url || "#"
                        : "#"
                    }
                    filename={download.label}
                    filesize={0}
                  />
                ))}
              </div>
            </div>

            <div className="w-full shrink-0 lg:w-[382px]">
              <RelatedEvents items={relatedItems} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
