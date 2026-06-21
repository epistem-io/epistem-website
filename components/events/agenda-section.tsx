"use client";

import { useTranslations } from "next-intl";

export type AgendaItem = {
  title: string;
  description: string;
  time: string;
};

type AgendaSectionProps = {
  agendas: AgendaItem[];
};

export function AgendaSection({ agendas }: AgendaSectionProps) {
  const t = useTranslations("EventDetailPage");

  if (agendas.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6 border-t border-[#EAECF0] pt-8">
      <h2 className="font-lp-headline-xs-bold text-text-icons-base-main">
        {t("agendaTitle")}
      </h2>

      <div className="relative pl-0 sm:pl-0">
        {/* <div className="absolute bottom-5 left-[5px] top-5 w-px bg-primary-red-pink-light-active sm:left-[11px]" /> */}

        <div className="space-y-0">
          {agendas.map((agenda) => (
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
                {/* <div className="absolute left-[-19px] top-5 size-3 rounded-full bg-primary-pink sm:left-[-22px]" /> */}

                <div className="min-w-0 flex-1 rounded-[12px] border border-primary-red-pink-light-active/80 bg-white p-3">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                    <h3 className="min-w-0 font-lp-headline-xxs-bold text-primary-pink">
                      {agenda.title}
                    </h3>

                    <div className="shrink-0">
                      <span className="inline-flex rounded-[8px] bg-primary-red-pink-light px-2 py-1 font-lp-text-s-semibold text-primary-pink">
                        {agenda.time}
                      </span>
                    </div>
                  </div>

                  <p className="mt-1 font-lp-text-l-regular text-text-icons-base-second">
                    {agenda.description}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
