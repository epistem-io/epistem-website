import Image from "next/image";
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

const pageTitle =
  "Epistem Summit Summer 2026 - Kopidarat 3, Luma & Rona Launching";

const articleParagraphs = [
  "Surat keputusan tersebut ditandatangani Bupati Sorong Selatan, Samsudin Anggiluli, dan diserahkan pada Kamis, 6 Juni 2024, sehari setelah peringatan Hari Lingkungan Hidup Sedunia. Wilayah adat yang membentang di Distrik Saifi dan Seremuk tersebut lebih luas dari DKI Jakarta, yang luasnya 66.150 hektare.",
  '"Tanah ini sejak dahulu milik kami, hak kesulungan kami, diwariskan oleh para leluhur, dan akan menjadi masa depan anak-cucu kami. Namun, pengakuan wilayah adat penting untuk memberikan kepastian hukum bagi kami masyarakat adat," kata Ketua Dewan Persekutuan Masyarakat Adat Knasaimos, Fredrik Sagisolo, pada acara penyerahan SK di kantor Sekretariat Panitia Masyarakat Adat Sorong Selatan, Teminabuan, Sorong Selatan, Kamis, 6 Juni 2024.',
  '"Kami berharap, kepastian hukum ini bisa memperkuat benteng pertahanan kami untuk menjaga hutan dan wilayah adat dari ancaman investasi yang merugikan masyarakat adat dan Tanah Papua," ujarnya.',
  "Sekretaris Daerah Sorong Selatan Dance Nauw yang memimpin prosesi tersebut mengatakan, lebih dari dokumen administratif, SK tersebut merupakan bentuk penghormatan dan pengakuan atas keberadaan dan peran penting masyarakat adat menjaga kelestarian lingkungan dan budaya lokal. Pengakuan wilayah adat ini juga disebutnya sebagai tonggak sejarah dan bukti kepedulian terhadap masyarakat.",
  '"Pengakuan ini menunjukkan kepada masyarakat setempat dan pemerintah pusat, bahwa komitmen untuk melindungi lingkungan serta memastikan martabat dan kesejahteraan masyarakat adat berjalan beriringan," kata Dance.',
  '"Kami berharap pengakuan ini dapat memperkuat semangat gotong royong dan kebersamaan dalam mengelola wilayah adat demi kesejahteraan bersama," ujarnya.',
];

const downloads = [
  { href: "#", filename: "ToR - English version", filesize: 2.4 },
  { href: "#", filename: "ToR - Indonesia version", filesize: 2.4 },
];

export default function EventsPage() {
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
                {pageTitle}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="mt-8 max-w-[862px] font-lp-headline-xl-bold text-text-icons-base-main md:text-balance">
          {pageTitle}
        </h1>

        <div className="mt-8 rounded-2xl bg-white px-5 py-5 shadow-[0_8px_24px_rgba(37,37,37,0.04)] sm:px-6 sm:py-6 lg:mt-10 lg:px-9 lg:py-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
                  <p className="font-lp-text-l-semibold text-gray-dark">
                    24 January 2026
                  </p>
                  <div className="flex items-center gap-1 text-gray-dark">
                    <MapPinIcon className="size-5 shrink-0" />
                    <span className="font-lp-text-l-semibold">
                      Jakarta, Indonesia
                    </span>
                  </div>
                </div>

                <div className="relative aspect-[500/261] overflow-hidden rounded-xl">
                  <Image
                    src="/images/collage.webp"
                    alt={pageTitle}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 778px"
                  />
                </div>

                <div className="space-y-6 pt-1">
                  {articleParagraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="font-lp-body-m-regular text-justify text-text-icons-base-second"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {downloads.map((download) => (
                  <FileDownload key={download.filename} {...download} />
                ))}
              </div>
            </div>

            <div className="w-full shrink-0 lg:w-[382px]">
              <RelatedEvents
                items={[
                  {
                    title:
                      "Biodiversity in a Post-Pandemic World Pandemic World",
                    meta: "18 March - Virtual",
                    img: "/images/collage.webp",
                    url: "#",
                  },
                  {
                    title:
                      "Biodiversity in a Post-Pandemic World Pandemic World",
                    meta: "18 March - Virtual",
                    img: "/images/collage.webp",
                    url: "#",
                  },
                  {
                    title:
                      "Biodiversity in a Post-Pandemic World Pandemic World",
                    meta: "18 March - Virtual",
                    img: "/images/collage.webp",
                    url: "#",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
