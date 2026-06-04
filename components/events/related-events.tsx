import Image from "next/image";

import { Link } from "@/i18n/navigation";

interface RelatedEventItem {
  img: string;
  title: string;
  url: string;
  meta: string;
}

interface RelatedEventsProps {
  items?: RelatedEventItem[];
  emptyMessage?: string;
  title?: string;
}

export function RelatedEvents({
  items = [],
  title = "Related Events",
  emptyMessage = "Oops, there is no related events at this time",
}: RelatedEventsProps) {
  return (
    <aside className="w-full rounded-2xl border border-[#EAECF0] bg-white p-4">
      <h2 className="font-lp-text-xl-bold text-text-icons-base-main">
        {title}
      </h2>

      {items.length === 0 ? (
        // <div className="mt-4 rounded-2xl border border-[#EAECF0] px-4 py-5">
        <p className="font-lp-text-l-regular text-text-icons-base-second mt-6">
          {emptyMessage}
        </p>
      ) : (
        // </div>
        <div className="mt-4 space-y-4">
          {items.map((item, index) => (
            <div
              className="space-y-4 [&:not(:first-of-type)>.child-element]:block"
              key={`${item.title}-${item.meta}-${index}`}
            >
              <div className="hidden child-element h-px w-full bg-custom-text-grey-mid/50"></div>
              <Link
                href={item.url}
                className="block rounded-lg transition-colors hover:bg-[#fff8fb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-pink focus-visible:ring-offset-2"
              >
                <div className="flex items-end gap-4 overflow-hidden rounded-lg">
                  <div className="relative h-[100px] w-[120px] shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="120px"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-2 self-center">
                    <h3 className="font-lp-text-l-semibold text-primary-pink">
                      {item.title}
                    </h3>
                    <p className="font-lp-text-s-regular text-text-icons-base-second">
                      {item.meta}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}
