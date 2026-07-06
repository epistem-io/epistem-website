"use client";

import { Button } from "@/components/ui/button";
import {
  // ArrowLeftIcon,
  // ArrowRightIcon,
  ChevronDownIcon,
  // ChevronLeftIcon,
  // ChevronRightIcon,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useTranslations } from "next-intl";

export const Section4 = () => {
  const t = useTranslations("HomePage.Section4");

  const [isOpen, setIsOpen] = useState(false);

  const imageComp = useRef(null);
  const imageMobile = useRef(null);
  const textComp = useRef(null);

  const imageIsInView = useInView(imageComp, { once: true });
  const imageMobileIsInView = useInView(imageMobile, { once: true });
  const textIsInView = useInView(textComp, { once: true });

  return (
    <div className="base-container flex flex-col items-center justify-start w-full px-2 max-lg:mt-8 lg:my-15 xl:my-20">
      <div className="w-full relative">
        <div className="grid grid-cols-4 grid-rows-1 lg:grid-rows-1 lg:grid-cols-12 py-0 max-lg:pt-0 lg:py-0 gap-y-9 lg:gap-x-6.5 xl:gap-x-9 h-fit relative max-lg:pb-0">
          <motion.div
            ref={imageComp}
            // initial={{ x: "0%", opacity: 0 }}
            // animate={{
            //   x: 0,
            //   opacity: imageIsInView ? 1 : 0,
            //   transition: { bounce: 0, visualDuration: 2, delay: 0.1 },
            // }}
            className={cn(
              "max-lg:hidden lg:col-span-4 xl:col-span-5 aspect-square relative z-11",
              isOpen && "aspect-auto",
            )}
          >
            <div
              className={cn(
                // "max-h-160 rounded-2xl overflow-hidden",
                // isOpen && "max-h-250",
                'bg-[url("/images/collage.webp")] bg-cover bg-top-left bg-no-repeat rounded-2xl',
                "h-full",
              )}
            >
              {/* <Image
                src="/images/collage.webp"
                width={459}
                height={1922}
                alt="collage landsat"
                // objectFit="contain"
                className="object-top object-cover"
              /> */}
            </div>
          </motion.div>
          <motion.div
            ref={textComp}
            // initial={{ y: "100%", opacity: 0 }}
            // animate={{
            //   y: 0,
            //   opacity: textIsInView ? 1 : 0,
            //   transition: { bounce: 0, visualDuration: 2, delay: 0.2 },
            // }}
            className="col-span-4 lg:col-span-8 xl:col-span-7 flex flex-col relative z-10 max-lg:space-y-2 space-y-6"
          >
            <p className="font-lp-headline-xxs-bold lg:font-lp-headline-l-bold xl:font-lp-headline-xl-bold text-text-icons-base-main text-center lg:text-left">
              {t("title")}
            </p>
            <div className="space-y-2 lg:space-y-4.5 xl:space-y-6 mt-0 lg:mt-0">
              {/* WIP NO MOBILE DESIGN SYSTEM */}
              <p className="max-lg:font-pjs max-lg:text-[13px] max-lg:font-bold lg:font-lp-headline-s-bold xl:font-lp-headline-xl-bold text-primary-red-pink-dark-hover text-center lg:text-left">
                {t("caption")}
              </p>
              {/* WIP NO MOBILE DESIGN SYSTEM */}
              <p className="max-lg:font-pjs max-lg:text-[11px] max-lg:font-normal lg:font-lp-text-s-regular xl:font-lp-text-xl-regular text-text-icons-base-main text-justify lg:text-left">
                {t("description")}
              </p>
              <div className="flex flex-row items-center max-lg:justify-center">
                <Button
                  variant={"link"}
                  className="p-0"
                  onClick={() => {
                    setIsOpen((val) => !val);
                  }}
                >
                  <p className="font-pjs text-[10px] lg:text-sm xl:text-xl font-bold text-primary-pink ">
                    {isOpen ? t("readLess") : t("readMore")}
                  </p>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    className=""
                  >
                    <ChevronDownIcon className="text-primary-pink size-4 stroke-3" />
                  </motion.div>
                </Button>
              </div>
              {isOpen && (
                <div className="space-y-2 lg:space-y-4.5 xl::space-y-8 max-lg:font-pjs max-lg:text-[11px] max-lg:font-normal lg:font-lp-text-s-regular xl:font-lp-text-xl-regular text-text-icons-base-main max-lg:text-justify">
                  <div className="">
                    <p className="text-primary-pink max-lg:text-center">
                      {t("item1Title")}
                    </p>
                    <div className="">
                      {t.rich("item1Description", {
                        a1: (chunks) => (
                          <Link
                            target="_blank"
                            rel="noreferrer"
                            className="text-primary-pink underline underline-offset-2"
                            href="http://iiasa.ac.at"
                          >
                            {chunks}
                          </Link>
                        ),
                        a2: (chunks) => (
                          <Link
                            target="_blank"
                            rel="noreferrer"
                            className="text-primary-pink underline underline-offset-2"
                            href="http://cifor-icraf.org"
                          >
                            {chunks}
                          </Link>
                        ),
                        a3: (chunks) => (
                          <Link
                            target="_blank"
                            rel="noreferrer"
                            className="text-primary-pink underline underline-offset-2"
                            href="http://wri-indonesia.org/en"
                          >
                            {chunks}
                          </Link>
                        ),
                      })}
                    </div>
                  </div>

                  <div className="">
                    <p className="">{t("item2Description")}</p>
                  </div>

                  <div className="">
                    <p className="text-primary-pink max-lg:text-center">
                      {t("item3Title")}
                    </p>
                    <p className="">{t("item3Description")}</p>
                  </div>

                  <div className="">
                    <p className="">{t("item4Description")}</p>
                  </div>

                  <div className="">
                    <p className="text-primary-pink max-lg:text-center">
                      {t("item5Title")}
                    </p>
                    <p className="">{t("item5Description")}</p>
                  </div>

                  <div className="">
                    <p className="">{t("item6Description")}</p>
                  </div>

                  <div className="">
                    <p className="text-primary-pink max-lg:text-center">
                      {t("item7Title")}
                    </p>
                    <p className="">{t("item7Description")}</p>
                    <ul className="list-disc pl-7">
                      {t.rich("item8Description", {
                        li: (chunks) => (
                          <li>
                            <p>{chunks}</p>
                          </li>
                        ),
                      })}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
          <motion.div
            ref={imageMobile}
            // initial={{ x: "0%", opacity: 0 }}
            // animate={{
            //   x: 0,
            //   opacity: imageMobileIsInView ? 1 : 0,
            //   transition: { bounce: 0, visualDuration: 2, delay: 0.1 },
            // }}
            className="hidden col-span-4 relative z-11 h-fit"
          >
            <div className={cn("rounded-2xl overflow-hidden")}>
              <Image
                src="/images/collage-mobile.webp"
                width={722}
                height={258}
                alt="collage landsat"
                // objectFit="contain"
                className="object-top object-cover w-full h-32"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
