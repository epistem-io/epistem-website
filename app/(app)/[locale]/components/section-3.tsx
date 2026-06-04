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
import { is } from "zod/locales";
import { useTranslations } from "next-intl";
import { SectionHead } from "./section-head";

const featureArray = [
  {
    titleKey: "item1Title",
    descriptionKey: "item1Description",
    url: "/icons/approach-1.svg",
    background: "bg-primary-pink",
  },
  {
    titleKey: "item2Title",
    descriptionKey: "item2Description",
    url: "/icons/approach-2.svg",
    background: "bg-primary-pink-active",
  },
  {
    titleKey: "item3Title",
    descriptionKey: "item3Description",
    url: "/icons/approach-3.svg",
    background: "bg-primary-pink-dark-hover",
  },
];
export const Section3 = () => {
  const t = useTranslations("HomePage.Section3");

  const [selected, setSelected] = useState(-1);

  const titleComp = useRef(null);
  const approachComp = useRef(null);
  const approachCompMobile = useRef(null);

  const titleIsInView = useInView(titleComp, { once: true });
  const approachIsInView = useInView(approachComp, { once: true });
  const approachIsInViewMobile = useInView(approachCompMobile, { once: true });

  return (
    <div className="base-container flex flex-col items-center justify-start w-full px-2 lg:my-15 xl:my-20 max-lg:mt-8">
      {/* <div className="grid grid-cols-12 w-full pt-15 lg:pt-12 pb-10 lg:pb-0 gap-y-3">
        <motion.div
          ref={titleComp}
          initial={{ y: "100%" }}
          animate={{
            y: titleIsInView ? 0 : "100%",
            transition: {
              visualDuration: 2,
            },
          }}
          className="col-span-12 lg:col-span-5 flex flex-row items-center"
        >
          <p className="font-pjs text-xl lg:text-6xl font-bold text-text-icons-base-main leading-normal text-center lg:text-left w-full">
            {t("title")}
          </p>
        </motion.div>
        <motion.div
          initial={{ y: "100%" }}
          animate={{
            y: titleIsInView ? 0 : "100%",
            transition: {
              visualDuration: 2,
            },
          }}
          className="max-lg:col-span-12 lg:col-start-9 lg:col-end-13 flex flex-row items-center justify-end"
        >
          <p className="font-pjs text-xs lg:text-xl font-regular text-text-icons-base-main leading-normal text-center lg:text-justify w-full">
            {t("caption")}
          </p>
        </motion.div>
      </div> */}
      <SectionHead title={t("title")} caption={t("caption")} />
      <div className="hidden lg:block w-full relative">
        <div
          ref={approachComp}
          className="grid grid-cols-12 pt-12 gap-y-4 gap-x-4 h-fit"
        >
          {featureArray.map((item, index) => {
            const isSelected = index === selected;
            return (
              <motion.div
                // layout
                // initial={{
                //   opacity: 0,
                // }}
                // animate={{
                //   opacity: approachIsInView ? 1 : 0,
                //   transition: {
                //     visualDuration: 3,
                //     delay: 0.2 + (index + 1) * 0.1,
                //   },
                // }}
                key={`approach-features-${index}`}
                className={`col-span-4 ${item.background} rounded-[20px] overflow-hidden h-fit`}
              >
                <div
                  className={cn(
                    "flex flex-col items-center justify-between pt-4 px-0 h-fit w-full",
                    !isSelected && "aspect-square",
                  )}
                >
                  <div className="flex flex-col items-center">
                    {/* <p className="px-6 font-lp-headline-s-bold text-text-icons-on-color text-center min-h-22"> */}
                    <p className="px-6 lg:font-lp-headline-xxs-bold xl:font-lp-headline-s-bold text-text-icons-on-color text-center min-h-22 lg:min-h-15 xl:min-h-22">
                      {t(item.titleKey)}
                    </p>
                    <div className="">
                      {/* <div className="px-6 mt-8 lg:mt-8"> */}
                    </div>
                  </div>
                  <Image
                    src={item.url}
                    alt={item.titleKey}
                    width={200}
                    height={200}
                    className="h-fit w-full max-w-40 lg:max-w-30 xl:max-w-50 aspect-square pt-5"
                  />
                  <div
                    className={cn("pt-10 lg:pt-5 xl:pt-10", item.background)}
                  >
                    <p
                      className={cn(
                        "px-6 font-lp-text-s-regular xl:font-lp-text-l-semibold text-text-icons-on-color mt-0 text-ellipsis",
                        index !== selected && "line-clamp-2",
                      )}
                    >
                      {t(item.descriptionKey)}
                    </p>
                    <Button
                      className={`text-gray-100 py-4 w-full mt-2 rounded-t-none rounded-b-2xl ${item.background} hover:${item.background} hover:brightness-110 h-fit`}
                      onClick={() => {
                        if (isSelected) {
                          setSelected(-1);
                          return;
                        }

                        setSelected(index);
                      }}
                      // variant={"ghost"}
                    >
                      <motion.div
                        animate={{ rotate: isSelected ? 180 : 0 }}
                        className=""
                      >
                        <ChevronDownIcon className="mx-auto size-6 " />
                      </motion.div>
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <div className="block lg:hidden w-full relative mt-10">
        <div
          ref={approachCompMobile}
          className="grid grid-cols-12 py-0 max-lg:gap-y-2 gap-x-4 h-fit"
        >
          {featureArray.map((item, index) => {
            const isSelected = index === selected;
            return (
              <motion.div
                // layout
                // initial={{
                //   opacity: 0,
                // }}
                // animate={{
                //   opacity: approachIsInViewMobile ? 1 : 0,
                //   transition: {
                //     visualDuration: 3,
                //     delay: 0.2 + (index + 1) * 0.1,
                //   },
                // }}
                key={`approach-features-${index}`}
                className={`col-span-12 ${item.background} rounded-[12px] overflow-hidden h-fit p-4 flex flex-row`}
              >
                <div
                  className={cn(
                    "flex flex-row gap-x-3 items-start w-full justify-start",
                  )}
                >
                  <Image
                    src={item.url}
                    alt={item.titleKey}
                    width={68}
                    height={68}
                    className="aspect-square size-17"
                  />
                  <div className="flex flex-col gap-y-6 items-start">
                    {/* WIP NO DESIGN SYSTEM */}
                    <p className="font-pjs text-sm lg:text-[28px] font-extrabold text-text-icons-on-color text-left">
                      {t(item.titleKey)}
                    </p>
                    {/* WIP NO DESIGN SYSTEM */}
                    <motion.p
                      layout="size"
                      className={cn(
                        "font-pjs text-[11px] font-medium text-text-icons-on-color",
                        // index !== selected && "line-clamp-3",
                      )}
                      animate={{
                        display: isSelected ? "" : "-webkit-box",
                        // webkitLineClamp: isSelected ? 0 : 3,
                        overflow: isSelected ? "" : "hidden",
                        maxHeight: isSelected ? "200px" : "30px",
                        transition: {
                          bounce: 0,
                        },
                      }}
                    >
                      {t(item.descriptionKey)}
                    </motion.p>
                  </div>
                </div>

                <Button
                  className={`text-gray-100 ${item.background} hover:${item.background} hover:brightness-110 mt-auto h-auto p-1 rounded-full`}
                  onClick={() => {
                    if (isSelected) {
                      setSelected(-1);
                      return;
                    }

                    setSelected(index);
                  }}
                  // variant={"ghost"}
                >
                  <motion.div
                    animate={{ rotate: isSelected ? 180 : 0 }}
                    className=""
                  >
                    <ChevronDownIcon className="mx-auto size-5 " />
                  </motion.div>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
