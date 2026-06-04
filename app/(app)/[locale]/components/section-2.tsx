"use client";

import { Button } from "@/components/ui/button";
// import {
//   ArrowLeftIcon,
//   ArrowRightIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon,
// } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { SectionHead } from "./section-head";
import { Link } from "@/i18n/navigation";

export const Section2 = () => {
  const t = useTranslations("HomePage.Section2");

  const featureArray = [
    {
      component: (
        <div className="h-full w-full lg:grid lg:grid-cols-2 lg:grid-rows-1 gap-x-20">
          <motion.div
            initial={{
              scale: 1.55,
            }}
            className="pointer-events-none col-span-1 lg:col-span-1 max-lg:w-fit flex flex-col items-center lg:justify-center max-lg:mx-auto"
          >
            <Image
              width={1144}
              height={1064}
              src="/images/luma-displays.webp"
              className="max-sm:max-w-45 max-md:max-w-60 max-lg:max-w-70 max-xl:max-w-80 xl:max-w-92.5 lg:mr-0 max-sm:pl-0 max-lg:pl-0 relative  max-sm:bottom-0 max-sm:-mb-6 max-md:-mb-12 max-lg:-mb-30"
              alt="luma"
            />
          </motion.div>
          <motion.div
            layout
            className="space-y-3 lg:space-y-6 flex flex-col justify-start pb-0 lg:pb-0 col-span-1 lg:col-span-1 max-md:pt-25 max-lg:pt-50 lg:pl-0 lg:mt-4 max-lg:pr-0"
          >
            <p className="font-lp-text-xs-regular lg:font-lp-headline-xxs-medium xl:font-lp-headline-xs-medium text-text-icons-on-color">
              {t("item1Title")}
            </p>
            <div className="space-y-3 lg:space-y-4">
              <p className="font-lp-headline-xxs-bold lg:font-lp-headline-s-bold xl:font-lp-headline-xl-bold text-text-icons-on-color">
                {t.rich("item1Subtitle", {
                  br: () => <br />,
                })}
              </p>
              <p className="font-lp-text-xs-regular lg:font-lp-text-m-regular text-text-icons-on-color">
                {t.rich("item1Description", {
                  br: () => <br />,
                })}
              </p>
            </div>
            <div className="">
              <Link href={`${process.env.LUMA_URL}`}>
                <Button
                  variant={"primary"}
                  size={"lg"}
                  className="h-auto py-1 lg:py-3 px-5 rounded-md lg:rounded-[16px]"
                >
                  <p className="font-text-xs-semibold lg:text-[13.5px] xl:font-text-xl-semibold text-text-icons-on-color">
                    {t("item1ButtonCaption")}
                  </p>
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      ),
    },
    {
      component: (
        // <div className="h-full w-full grid grid-cols-12 gap-x-10">
        //   <motion.div
        //     layout
        //     initial={{
        //       opacity: 0,
        //       x: "-100%",
        //       y: 0,
        //     }}
        //     animate={{
        //       opacity: 1,
        //       x: 0,
        //       y: 0,
        //       transition: {
        //         visualDuration: 1,
        //       },
        //     }}
        //     className="space-y-6 flex flex-col justify-end pb-10 col-span-7"
        //   >
        //     <p className="font-pjs text-2xl font-medium text-text-icons-on-color leading-normal">
        //       Rona
        //     </p>
        //     <div className="space-y-4">
        //       <p className="font-pjs text-4xl font-bold text-text-icons-on-color leading-normal">
        //         Shared data for shared benefits
        //       </p>
        //       <p className="font-pjs text-2xl font-regular text-text-icons-on-color leading-normal">
        //         Scalable repository of participatory land use and land cover
        //         mapping.
        //       </p>
        //     </div>
        //     <div className="">
        //       <Button variant={"primary"} size={"lg"} className="" disabled>
        //         <p className="font-aptos text-xs lg:text-lg font-semibold lg:font-bold text-text-icons-on-color">
        //           Rona Coming Soon
        //         </p>
        //       </Button>
        //     </div>
        //   </motion.div>
        //   <motion.div
        //     initial={{
        //       opacity: 0,
        //     }}
        //     animate={{
        //       opacity: 1,
        //       scale: 1.2,
        //       transition: {
        //         visualDuration: 1,
        //       },
        //     }}
        //     className="pointer-events-none col-span-5 right-20 relative"
        //   >
        //     <Image
        //       width={1616}
        //       height={1238}
        //       src="/images/display.webp"
        //       className="ml-20"
        //       alt="luma"
        //       style={{
        //         transform: "scale(-1, 1)",
        //       }}
        //     />
        //   </motion.div>
        // </div>
        <div className="h-full w-full lg:grid lg:grid-cols-2 lg:grid-rows-1 gap-x-20 flex flex-col-reverse relative">
          <motion.div
            layout
            className="space-y-3 lg:space-y-6 flex flex-col justify-start pb-0 col-span-1 lg:col-span-1 max-md:pt-25 max-lg:pt-50 lg:mt-4"
            // className="space-y-6 flex flex-col justify-end pb-10 col-span-1 lg:col-span-7 max-lg:pt-20 lg:pl-20"
          >
            <p className="font-lp-text-xs-regular lg:font-lp-headline-xxs-medium xl:font-lp-headline-xs-medium text-text-icons-on-color">
              {t("item2Title")}
            </p>
            <div className="space-y-3 lg:space-y-4 w-[90%]">
              <p className="font-lp-headline-xxs-bold lg:font-lp-headline-s-bold xl:font-lp-headline-xl-bold text-text-icons-on-color">
                {t.rich("item2Subtitle", {
                  br: () => <br />,
                })}
              </p>
              <p className="font-lp-text-xs-regular lg:font-lp-text-m-regular text-text-icons-on-color">
                {t.rich("item2Description", {
                  br: () => <br />,
                })}
              </p>
            </div>
            <div className="">
              <Button
                variant={"primary"}
                size={"lg"}
                className="h-auto py-1 lg:py-3 px-5 rounded-md lg:rounded-[16px]"
                disabled
              >
                <p className="font-text-xs-semibold lg:text-[13.5px] xl:font-text-xl-semibold text-text-icons-on-color">
                  {t("item2ButtonCaption")}
                </p>
              </Button>
            </div>
          </motion.div>
          <motion.div className="pointer-events-none col-span-1 lg:col-span-1 max-lg:w-fit flex flex-col items-start lg:justify-center max-lg:mx-auto relative">
            <motion.div
              initial={{
                scale: 1.55,
              }}
              className="lg:max-xl:absolute block lg:max-xl:block xl:block"
            >
              <Image
                width={1144}
                height={1064}
                // width={1616}
                // height={1238}
                src="/images/rona-display.webp"
                // mx-auto pl-10
                // className="max-sm:max-w-50 max-md:max-w-60 max-lg:max-w-70 lg:w-3/4 lg:ml-0 relative right-5 lg:right-20 max-sm:bottom-2 max-sm:-mb-6 max-md:-mb-12 max-lg:-mb-30 lg:-bottom-5"
                className="max-sm:max-w-45 max-md:max-w-60 max-lg:max-w-70 max-xl:max-w-80 xl:max-w-92.5 lg:ml-0 relative max-sm:bottom-0 max-sm:-mb-6 max-md:-mb-12 max-lg:-mb-30"
                alt="luma"
              />
            </motion.div>
          </motion.div>
        </div>
      ),
    },
  ];

  const [selected, setSelected] = useState(0);

  const titleComp = useRef(null);
  // const demoComp = useRef(null);

  const titleIsInView = useInView(titleComp, { once: true });
  // const demoIsInView = useInView(demoComp, { once: true });

  return (
    <div className="base-container flex flex-col items-center justify-start w-full px-2 lg:py-0 my-15 max-lg:mt-8 max-lg:mb-2">
      {/* <div className="grid grid-cols-12 w-full pt-8 lg:pt-12 pb-10 lg:pb-0 sm:pb-12 gap-y-4">
        <motion.div
          ref={titleComp}
          initial={{ y: "100%" }}
          animate={{
            y: titleIsInView ? 0 : "100%",
            transition: {
              visualDuration: 2,
            },
          }}
          // className="col-span-4 flex flex-row items-center"
          className="col-span-12 lg:col-span-5 flex flex-row items-center"
        >
          <p className="w-full font-pjs text-xl lg:text-6xl font-bold text-text-icons-base-main leading-normal text-center lg:text-left">
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
          // className="col-start-9 col-end-13 flex flex-row items-center justify-end"
          className="max-lg:col-span-12 lg:col-start-9 lg:col-end-13 flex flex-row items-center justify-end"
        >
          <p className="w-full font-pjs text-xs lg:text-xl font-regular text-text-icons-base-main leading-normal text-center lg:text-justify">
            {t("caption")}
          </p>
        </motion.div>
      </div> */}
      <SectionHead title={t("title")} caption={t("caption")} />
      <div className="mt-10 md:mt-10 lg:mt-15 xl:mt-20 pt-0 md:pt-0 lg:pt-0 w-full relative">
        {/* <div className="w-full max-lg:px-6 max-lg:pb-3.5 lg:p-12 rounded-lg bg-text-icons-base-main h-fit lg:min-h-125 lg:h-125 flex flex-col gap-y-2 px-8 lg:px-12 relative"> */}
        <div className="w-full max-lg:px-3.5 max-lg:pb-9.5 lg:p-9 xl:p-12 px-8 lg:px-9 xl:px-12 rounded-lg bg-text-icons-base-main h-fit flex flex-col gap-y-2 relative">
          {featureArray.map((item, index) => {
            const isSelected = index === selected;

            if (isSelected)
              return <div key={`features-${index}`}>{item.component}</div>;

            return null;
          })}

          <div className="flex flex-row w-full justify-end gap-x-2 mt-auto absolute lg:right-12 right-3.5 lg:bottom-12 bottom-3.5">
            {featureArray.map((_, index) => {
              const isSelected = index === selected;
              return (
                <div
                  key={`feature-button-${index}`}
                  className={cn(
                    "h-1 lg:h-2 w-13.5 lg:w-21 xl:w-28 rounded-full hover:cursor-pointer hover:brightness-90 transition-all duration-200",
                    isSelected
                      ? "bg-primary-red-pink-light-active"
                      : "bg-white",
                  )}
                  onClick={() => {
                    if (isSelected) return;

                    setSelected(index);
                  }}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
