import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HighlightEvent } from "@/components/events/highlight-event";
import { PastEvents } from "@/components/events/past-events";
import { Link } from "@/i18n/navigation";
import { getFeaturedEvent, getPastEvents } from "@/lib/events";
import { getTranslations } from "next-intl/server";
import { ChevronLeftIcon } from "lucide-react";

type Props = {
  params: Promise<{
    locale: "en" | "id";
  }>;
};

export default async function EventsPage({ params }: Props) {
  const { locale } = await params;
  const featuredEvent = await getFeaturedEvent(locale);
  const pastEvents = await getPastEvents(locale);

  const t = await getTranslations("EventsListPage");

  return (
    // <main className="pt-[120px] pb-20">
    //   <section className="base-container px-2">
    //     <h1 className="font-lp-headline-xl-bold">Events</h1>
    //     <p className="mt-4 text-text-icons-base-second">List events</p>
    //   </section>
    // </main>
    <main className="relative overflow-hidden bg-[#FAEDF2] pt-20 md:pt-[150px]">
      {/* <div className="absolute inset-x-0 top-0 h-[320px] bg-[#FAEDF2]" /> */}
      <div className="pb-3 md:pb-20">
        <section className="base-container relative z-10 mx-auto flex w-full flex-col px-0">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 self-start text-primary-pink md:hidden"
          >
            <ChevronLeftIcon className="size-3" aria-hidden="true" />
            <span className="font-lp-text-xs-semibold">
              {t("breadcrumb.home")}
            </span>
          </Link>

          <Breadcrumb className="hidden md:block">
            <BreadcrumbList className="gap-1 text-[15px] leading-[22px]">
              <BreadcrumbItem>
                <BreadcrumbLink
                  asChild
                  className="font-aptos font-semibold text-text-icons-base-second hover:text-primary-pink"
                >
                  <Link href="/">{t("breadcrumb.home")}</Link>
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
                  <Link href="/events">{t("breadcrumb.events")}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="text-center md:text-center mt-2 md:mt-8 max-w-[862px] font-lp-headline-xxs-bold md:font-lp-headline-xl-bold text-text-icons-base-main md:text-balance mb-3">
            {t("title")}
          </h1>

          <span className="text-custom-text-grey-dark font-lp-body-m-regular md:font-lp-body-xl-regular text-center md:text-center">
            {/* Workshops, launches, and community gatherings driving open LULC{" "}
            <br />
            mapping in Southeast Asia. */}
            {t.rich("description", {
              br: () => <br />,
            })}
          </span>
        </section>
      </div>
      <div className="bg-white py-3 md:py-20">
        <div className="base-container flex w-full flex-col gap-16">
          {featuredEvent ? (
            <HighlightEvent event={featuredEvent} locale={locale} />
          ) : null}

          <PastEvents events={pastEvents} locale={locale} />
        </div>
      </div>
    </main>
  );
}
