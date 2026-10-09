"use client";

import { useTranslations } from "next-intl";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type AgendaItem = {
  title: string;
  description: string;
  time: string;
};

export type AgendaDay = {
  /** Stable id for the tab, e.g. "day-1". */
  key: string;
  /** Locale-formatted date shown on the tab, e.g. "Wed, May 20". */
  label: string;
  items: AgendaItem[];
};

type AgendaSectionProps = {
  days: AgendaDay[];
};

export function AgendaSection({ days }: AgendaSectionProps) {
  const t = useTranslations("EventDetailPage");
  // Days without items get no tab; a one-day event shows no tab strip at all.
  const visibleDays = days.filter((day) => day.items.length > 0);

  if (visibleDays.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6 border-t-0 border-[#EAECF0]">
      <h2 className="font-lp-text-s-semibold md:font-lp-headline-xs-bold text-text-icons-base-main">
        {t("agendaTitle")}
      </h2>

      {visibleDays.length === 1 ? (
        <AgendaTimeline items={visibleDays[0].items} />
      ) : (
        <Tabs defaultValue={visibleDays[0].key}>
          <TabsList aria-label={t("agendaTitle")}>
            {visibleDays.map((day) => (
              <TabsTrigger key={day.key} value={day.key}>
                {day.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {visibleDays.map((day) => (
            <TabsContent key={day.key} value={day.key}>
              <AgendaTimeline items={day.items} />
            </TabsContent>
          ))}
        </Tabs>
      )}
    </section>
  );
}

function AgendaTimeline({ items }: { items: AgendaItem[] }) {
  return (
    <div className="relative pl-0 sm:pl-0">
      <div className="space-y-0">
        {items.map((agenda) => (
          <div
            key={`${agenda.time}-${agenda.title}`}
            className="group/item relative flex flex-row gap-x-3"
          >
            <div className="grid w-4.5 grid-flow-col grid-rows-2">
              <div className="flex flex-row justify-center">
                <div className="h-full w-px bg-[#DFE2E8] group-first/item:hidden" />
              </div>
              <div className="flex flex-row justify-center">
                <div className="h-full w-px bg-[#DFE2E8] group-last/item:hidden" />
              </div>
            </div>
            <article className="relative mb-6 flex w-full items-start gap-3">
              <div className="absolute -left-7 top-1/2 size-4 -translate-y-1/2 rounded-full bg-primary-pink mt-3" />

              <div className="min-w-0 flex-1 rounded-[12px] border border-primary-red-pink-light-active/80 bg-white p-3">
                <div className="flex flex-row gap-3 sm:flex-row sm:items-start justify-between sm:gap-6 flex-nowrap">
                  <h3 className="min-w-0 font-lp-text-s-semibold md:font-lp-headline-xxs-bold text-primary-pink">
                    {agenda.title}
                  </h3>

                  <div className="shrink-0">
                    <span className="inline-flex rounded-[8px] bg-primary-red-pink-light px-2 py-1 font-lp-text-xs-semibold md:font-lp-text-s-semibold text-primary-pink">
                      {agenda.time}
                    </span>
                  </div>
                </div>

                <p className="mt-1 font-lp-text-xs-semibold md:font-lp-text-l-regular text-text-icons-base-second">
                  {agenda.description}
                </p>
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
