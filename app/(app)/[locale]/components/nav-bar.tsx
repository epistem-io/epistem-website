"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { MenuIcon, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import Link from "next/link";

const STORYMAP_URL =
  "https://storymaps.arcgis.com/collections/797034ec6606463bb749fcc0c1527c98";

export const NavBar = () => {
  const locale = useLocale();
  const t = useTranslations("NavBar");
  const router = useRouter();
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);

  // The Luma page renders its own dedicated navbar (LumaNavBar).
  if (pathname === "/luma") {
    return null;
  }

  const handleChangeLocale = (newLocale: string) => {
    router.push(pathname, { locale: newLocale });
  };

  return (
    <div className="fixed w-full block left-1/2 -translate-x-1/2 z-50 px-3 pt-3 lg:px-0 lg:pt-0">
      <div className="relative z-30 bg-white shadow px-5 py-3 rounded-2xl lg:rounded-none">
        <div className="flex flex-row items-center justify-between w-full">
          {/* Left: logo */}
          <div className="flex flex-row items-center gap-x-2">
            <Link href="/">
              <Image
                src="/images/epistem-logos.webp"
                alt={t("logoAlt")}
                width={500}
                height={216}
                className="h-9 lg:h-16 w-auto pt-1.25 pr-1.25"
              />
            </Link>
          </div>

          {/* Right: locale toggle + hamburger */}
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

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-label={t("toggleMenu")}
              className="ml-1 p-1 hover:bg-transparent"
            >
              {menuOpen ? (
                <X className="text-primary-pink size-6 lg:size-8" />
              ) : (
                <MenuIcon className="text-primary-pink size-6 lg:size-8" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Dimmed backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="nav-dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMenuOpen(false)}
            className="fixed top-0 left-0 w-screen h-screen bg-black/40 z-10"
          />
        )}
      </AnimatePresence>

      {/* Dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="nav-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute right-3 lg:right-6 top-full mt-2 w-56 z-20"
          >
            <div className="flex flex-col rounded-2xl bg-white p-2 shadow-2xl">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 font-inter text-base font-medium text-gray-800 transition-colors hover:bg-primary-pink-light-hover hover:text-primary-pink"
              >
                {t("home")}
              </Link>
              <Link
                href="/luma"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 font-inter text-base font-medium text-gray-800 transition-colors hover:bg-primary-pink-light-hover hover:text-primary-pink"
              >
                {t("luma")}
              </Link>
              <Link
                href="/events"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 font-inter text-base font-medium text-gray-800 transition-colors hover:bg-primary-pink-light-hover hover:text-primary-pink"
              >
                {t("events")}
              </Link>
              <a
                href={STORYMAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 font-inter text-base font-medium text-gray-800 transition-colors hover:bg-primary-pink-light-hover hover:text-primary-pink"
              >
                {t("storymap")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
