import { getFeaturedEvent, getPastEvents } from "@/lib/events";
import { EventsSection } from "./events-section";
import { Suspense } from "react";

type Props = {
  locale: "en" | "id";
};

export const Events = async ({ locale }: Props) => {
  // const { locale } = await params;
  const featuredEvent = await getFeaturedEvent(locale);
  const pastEvents = await getPastEvents(locale);

  return (
    <Suspense>
      <EventsSection
        featuredEvent={featuredEvent}
        events={pastEvents}
        locale={locale}
      />
    </Suspense>
  );
};
