import { getFeaturedEvents, getPastEvents } from "@/lib/events";
import { EventsSection } from "./events-section";
import { Suspense } from "react";

type Props = {
  locale: "en" | "id";
};

export const Events = async ({ locale }: Props) => {
  // const { locale } = await params;
  const featuredEvents = await getFeaturedEvents(locale);
  const pastEvents = await getPastEvents(locale);

  return (
    <Suspense>
      <EventsSection
        featuredEvents={featuredEvents}
        events={pastEvents}
        locale={locale}
      />
    </Suspense>
  );
};
