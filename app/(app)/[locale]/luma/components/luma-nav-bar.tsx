"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import Link from "next/link";

export const LumaNavBar = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleChangeLocale = (newLocale: string) => {
    router.push(pathname, { locale: newLocale });
  };

  return (
    <div className="fixed w-full block left-1/2 -translate-x-1/2 z-50">
      <div className="relative z-30 bg-[#F6DFE5] shadow px-5 py-3">
        <div className="flex flex-row items-center justify-between w-full">
          {/* Left: logo */}
          <div className="flex flex-row items-center gap-x-2">
            <Link href="/">
              <Image
                src="/images/epistem-logos.webp"
                alt="epistem logo"
                width={500}
                height={216}
                className="h-9 lg:h-16 w-auto pt-1.25 pr-1.25"
              />
            </Link>
          </div>

          {/* Center: Luma dropdown toggle */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Button
              variant="ghost"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              className="flex flex-row items-center gap-x-2 p-1 hover:bg-transparent"
            >
              <span className="font-inter text-lg lg:text-2xl font-regular text-primary-pink">
                Luma
              </span>
              <motion.span
                animate={{ rotate: menuOpen ? 0 : 180 }}
                transition={{ duration: 0.2 }}
                className="flex"
              >
                <ChevronUp className="text-primary-pink size-5 lg:size-6" />
              </motion.span>
            </Button>
          </div>

          {/* Right: locale toggle */}
          <div className="flex flex-row items-center space-x-1.5">
            <Button
              onClick={() => {
                handleChangeLocale("en");
              }}
              disabled={locale === "en"}
              variant={"ghost"}
              className="p-1 disabled:opacity-100"
            >
              <p
                className={cn(
                  "font-inter text-sm lg:text-2xl font-regular text-muted",
                  locale === "en" && "font-bold text-primary-pink",
                )}
              >
                EN
              </p>
            </Button>
            <Separator
              orientation="vertical"
              className="data-[orientation=vertical]:min-h-6 bg-muted"
            />
            <Button
              onClick={() => {
                handleChangeLocale("id");
              }}
              disabled={locale === "id"}
              variant={"ghost"}
              className="p-1 disabled:opacity-100"
            >
              <p
                className={cn(
                  "font-inter text-sm lg:text-2xl font-regular text-muted",
                  locale === "id" && "font-bold text-primary-pink",
                )}
              >
                ID
              </p>
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="luma-dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMenuOpen(false)}
            className="fixed top-0 left-0 w-screen h-screen bg-black/40 z-10"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <div className="absolute left-0 top-full w-full px-4 lg:px-6 py-6 lg:py-8 z-20">
            <div className="mx-auto max-w-6xl rounded-3xl bg-white p-6 lg:p-8 shadow-2xl">
              <h2 className="text-center font-inter text-lg lg:text-xl font-semibold text-gray-700 tracking-wide">
                Epistem Platform
              </h2>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                {/* Luma — active */}
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="relative flex items-start justify-start rounded-2xl border-2 border-transparent hover:border-primary-pink
                    bg-[#FCEBF1] p-5 lg:p-6 aspect-[46/18] overflow-hidden transition-shadow hover:shadow-[0_0_24px_4px_#EFC6D5]"
                >
                  <div className="relative z-10 max-w-[55%]">
                    <h3 className="font-inter text-3xl lg:text-4xl font-semibold text-primary-pink">
                      Luma
                    </h3>
                    <p className="mt-1 font-inter text-xs lg:text-sm text-gray-800">
                      Land Use Mapping for All
                    </p>
                    <p className="mt-3 font-inter text-[12px] lg:text-xs text-gray-500">
                      Generate, analyze, and share high-precision LULC maps from
                      satellite data, no coding required.
                    </p>
                  </div>
                  <Image
                    src="/images/luma-card.svg"
                    alt="Luma land use map"
                    width={420}
                    height={340}
                    className="absolute right-0 bottom-0 w-[140px] h-[87px] sm:w-[200px] sm:h-[124px] lg:w-[254px] lg:h-[157px] object-contain object-right-bottom"
                  />
                </Link>

                {/* Rona */}
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="relative flex items-start justify-start rounded-2xl border-2 border-transparent hover:border-primary-pink
                    bg-[#FCEBF1] p-5 lg:p-6 aspect-[46/18] overflow-hidden transition-shadow hover:shadow-[0_0_24px_4px_#EFC6D5]"
                >
                  <div className="relative z-10 max-w-[55%]">
                    <h3 className="font-inter text-3xl lg:text-4xl font-semibold text-primary-pink">
                      Rona
                    </h3>
                    <p className="mt-1 font-inter text-sm lg:text-base text-gray-800">
                      Reference Observation Network App
                    </p>
                    <p className="mt-3 font-inter text-[12px] lg:text-xs text-gray-500">
                      Validate map accuracy through community-driven ground truth
                      and thematic accuracy assessment.
                    </p>
                  </div>
                  <Image
                    src="/images/rona-card.svg"
                    alt="Rona reference observation network"
                    width={420}
                    height={340}
                    className="absolute right-0 bottom-0 w-[140px] h-[87px] sm:w-[200px] sm:h-[124px] lg:w-[254px] lg:h-[157px] object-contain object-right-bottom"
                  />
                </Link>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
