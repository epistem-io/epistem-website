"use client";

import { Button } from "@/components/ui/button";
import {
  // ArrowLeftIcon,
  // ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { SectionHead } from "./section-head";
import { Link } from "@/i18n/navigation";

export const Section1 = () => {
  const t = useTranslations("HomePage.Section1");

  const demoArray = [
    {
      image: "/images/demo-1-new.gif",
      alt: "demo-1",
      height: 500,
      width: 500,
      captionKey: "item1Caption",
      descriptionKey: "item1Description",
      buttonComponent: (
        <Link href={`${process.env.LUMA_URL}`}>
          <Button className="px-5 py-1 lg:py-3 h-auto rounded-md">
            <p className="font-aptos text-[13px] lg:text-[13.5px] xl:text-lg font-semibold lg:font-bold text-text-icons-on-color">
              {t("buttonCaption1")}
            </p>
          </Button>
        </Link>
      ),
    },
    {
      image: "/images/demo-2.webp",
      alt: "demo-2",
      height: 365,
      width: 500,
      captionKey: "item2Caption",
      descriptionKey: "item2Description",
      buttonComponent: (
        <Button
          className="px-5 py-1 lg:py-3 h-auto rounded-md bg-[#DFE2E8] opacity-100! hover:cursor-not-allowed!"
          disabled
        >
          <p className="font-aptos text-[13px] lg:text-[13.5px] xl:text-lg font-semibold lg:font-bold text-[#979AA0]">
            {t("buttonCaption2")}
          </p>
        </Button>
      ),
    },
    {
      image: "/images/demo-3.webp",
      alt: "demo-3",
      height: 333,
      width: 500,
      captionKey: "item3Caption",
      descriptionKey: "item3Description",
      buttonComponent: (
        <Button
          className="px-5 py-1 lg:py-3 h-auto rounded-md bg-[#DFE2E8] opacity-100! hover:cursor-not-allowed!"
          disabled
        >
          <p className="font-aptos text-[13px] lg:text-[13.5px] xl:text-lg font-semibold lg:font-bold text-[#979AA0]">
            {t("buttonCaption3")}
          </p>
        </Button>
      ),
    },
    {
      image: "/images/demo-4.webp",
      alt: "demo-4",
      height: 486,
      width: 500,
      captionKey: "item4Caption",
      descriptionKey: "item4Description",
      buttonComponent: (
        <div className="flex flex-col lg:flex-row items-center gap-4">
          <Button asChild>
            <Link href="https://github.com/epistem-io" className="px-5 py-1 lg:py-3 h-auto rounded-md">
            <p className="font-aptos text-[13px] lg:text-[13.5px] xl:text-lg font-semibold lg:font-bold text-text-icons-on-color">
              {t("buttonCaption4")}
            </p>
            </Link>
          </Button>
          <Button
            className="px-5 py-1 lg:py-3 h-auto rounded-md bg-[#DFE2E8] opacity-100! hover:cursor-not-allowed!"
            disabled
          >
            <p className="font-aptos text-[13px] lg:text-[13.5px] xl:text-lg font-semibold lg:font-bold text-[#979AA0]">
              {t("buttonCaption5")}
            </p>
          </Button>
        </div>
      ),
    },
  ];

  const [selected, setSelected] = useState(0);

  const titleComp = useRef(null);
  // const demoComp = useRef(null);

  const titleIsInView = useInView(titleComp, { once: true });
  // const demoIsInView = useInView(demoComp, { once: true });

  const [direction, setDirection] = useState<1 | -1>(1);

  const selectedComp = () => {
    const item = demoArray[selected];
    return (
      <AnimatePresence mode="wait">
        <div className="w-full mb-9.5 rounded-3xl shadow-2xl">
          <motion.div
            className={cn(
              "relative rounded-3xl overflow-hidden border-10 border-black w-full col-span-11",
              // isSelected && "block",
              // `col-start-${1 + 2 * index} col-end-${6 + 2 * index}`,
              // `lg:col-start-${1 + 2 * index} lg:col-end-${5 + 2 * index}`,

              // index !== selected && "brightness-50",
            )}
            key={`demo-arr-${item.captionKey}`}
            // key={`demo-arr-${index}`}
            //
            // initial={{ x: "100%" }}
            // animate={{
            //   x: "0%",
            // }}
            // exit={{ x: "-100%" }}
            // initial={{ opacity: 0, x: direction * 50 }}
            // animate={{
            //   opacity: 1,
            //   x: 0,
            //   transition: {
            //     // delay: 0.2,
            //     // type: "spring",
            //     visualDuration: 0.3,
            //     bounce: 0.4,
            //   },
            // }}
            // exit={{ opacity: 0, x: direction * -50 }}
          >
            <Image
              key={`demo-arr-${item.captionKey}-img`}
              src={item.image}
              alt={item.alt}
              height={item.height}
              width={item.width}
              className={cn("aspect-square w-full z-21 min-w-25")}
              unoptimized
            />
            <motion.p
              layout
              className={cn(
                "font-pjs text-[10px] font-bold leading-normal text-text-icons-on-color bg-transparent z-23 absolute bottom-2.5 left-2.5 w-[90%]",
                // "font-pjs text-lg font-bold leading-normal text-text-icons-on-color bg-transparent z-23 absolute bottom-4 left-4 w-full",
              )}
            >
              {t(item.captionKey)}
            </motion.p>
            <motion.div
              className="h-full w-full absolute top-0 z-22"
              // initial={{ y: "100%" }}
              // animate={{
              //   y: 0,
              //   transition: {
              //     visualDuration: 2,
              //   },
              // }}
              style={{
                background:
                  "linear-gradient(180deg,rgba(0,0,0,0) 0%, rgba(204, 71, 120, 0.3) 77%, rgba(204, 71, 120, 0.6) 90%, rgba(204, 71, 120, 0.8) 100%)",
              }}
            ></motion.div>
          </motion.div>
        </div>
      </AnimatePresence>
    );
  };

  return (
    <div className="base-container flex flex-col items-center justify-start w-full px-2 lg:my-15 xl:my-20 max-lg:mb-0">
      {/* <div className="grid grid-cols-12 w-full pt-3 lg:pt-12 pb-3 lg:pb-6 gap-y-3">
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
          // className="col-start-3 lg:col-start-4 col-end-5 flex flex-row items-center justify-end"
          className="max-lg:col-span-12 lg:col-start-9 lg:col-end-13 flex flex-row items-center justify-end"
        >
          <p className="w-full font-pjs text-xs lg:text-xl font-regular text-text-icons-base-main leading-normal text-center lg:text-justify">
            {t("caption")}
          </p>
        </motion.div>
      </div> */}
      <SectionHead
        title={t.rich("title", {
          br: () => <br />,
        })}
        caption={t("caption")}
      />
      <div
        // className="rounded-md lg:rounded-2xl px-6 lg:px-25 py-9 lg:py-16 space-y-5 lg:space-y-16 max-lg:mb-2 w-full"
        className="rounded-md lg:rounded-2xl p-0 lg:p-12 xl:p-16 space-y-5 lg:space-y-9 xl:space-y-12 max-lg:mb-2 max-lg:pb-9.5 w-full mt-3 lg:mt-12"
        style={{
          background: "linear-gradient(120deg, #CC4778 41.94%, #A62555 89.53%)",
        }}
      >
        <div className="flex flex-col items-center lg:max-xl:mx-20">
          <div className="hidden lg:block ml-auto space-x-4 mb-6">
            <Button
              disabled={selected === 0}
              className="rounded-full"
              size={"icon-lg"}
              onClick={() => {
                setSelected(selected - 1);
              }}
            >
              <ChevronLeftIcon className="size-6" />
            </Button>
            <Button
              disabled={selected === 3}
              className="rounded-full"
              size={"icon-lg"}
              onClick={() => {
                setSelected(selected + 1);
              }}
            >
              <ChevronRightIcon className="size-6" />
            </Button>
          </div>
          {/*  */}

          <motion.div
            // layout
            // initial={{ y: "100%" }}
            // animate={{
            //   y: 0,
            //   transition: {
            //     visualDuration: 2,
            //   },
            // }}
            className="lg:hidden px-11.5 pt-9"
          >
            <div>{selectedComp()}</div>
            {/* {demoArray.map((item, index) => {
                const isSelected = index === selected;

                if (!isSelected) {
                  return <div key={`demo-arr-${index}`}></div>;
                }

                return (
                  <motion.div
                    className={cn(
                      "relative rounded-3xl overflow-hidden border-10 border-black w-full col-span-11",
                      // isSelected && "block",
                      // `col-start-${1 + 2 * index} col-end-${6 + 2 * index}`,
                      // `lg:col-start-${1 + 2 * index} lg:col-end-${5 + 2 * index}`,

                      // index !== selected && "brightness-50",
                    )}
                    key={`demo-arr-${index}`}
                    // initial={{ x: "-100%" }}
                    // animate={{
                    //   x: "0%",
                    // }}
                    exit={{ x: "-100%" }}
                  >
                    <Image
                      key={`demo-arr-${index}-img`}
                      src={item.image}
                      alt={item.alt}
                      height={item.height}
                      width={item.width}
                      className={cn("aspect-square w-full z-21 min-w-25")}
                    />
                    <motion.p
                      layout
                      className={cn(
                        "font-pjs text-[10px] font-bold leading-normal text-text-icons-on-color bg-transparent z-23 absolute bottom-2.5 left-2.5 w-[90%]",
                        // "font-pjs text-lg font-bold leading-normal text-text-icons-on-color bg-transparent z-23 absolute bottom-4 left-4 w-full",
                        !isSelected &&
                          (index > selected
                            ? "left-auto right-2.5 text-right w-1/2"
                            : "left-2.5 text-left w-1/2"),
                      )}
                    >
                      {item.caption}
                    </motion.p>
                    {isSelected && (
                      <motion.div
                        className="h-full w-full absolute top-0 z-22"
                        initial={{ y: "100%" }}
                        animate={{
                          y: 0,
                          transition: {
                            visualDuration: 2,
                          },
                        }}
                        style={{
                          background:
                            "linear-gradient(180deg,rgba(0,0,0,0) 0%, rgba(204, 71, 120, 0.3) 77%, rgba(204, 71, 120, 0.6) 90%, rgba(204, 71, 120, 0.8) 100%)",
                        }}
                      ></motion.div>
                    )}
                  </motion.div>
                );
              })} */}
          </motion.div>

          <motion.div
            layout
            // initial={{ y: "100%" }}
            // animate={{
            //   y: 0,
            //   transition: {
            //     visualDuration: 2,
            //   },
            // }}
            className="hidden lg:grid grid-cols-11 lg:grid-cols-11 gap-x-2 grid-rows-1 w-full mb-8 lg:mb-12 rounded-xl lg:rounded-[45px] shadow-2xl"
            // style={{
            //   boxShadow: "2.487px 2.487px 4.974px 0 rgba(0, 0, 0, 0.25);",
            // }}
          >
            {demoArray.map((item, index) => {
              const isSelected = index === selected;
              return (
                <motion.div
                  className={cn(
                    "row-start-1 row-end-2 relative rounded-xl lg:rounded-[45px] overflow-hidden border-8 lg:border-12 xl:border-16 border-black w-full",
                    // `col-start-${1 + 2 * index} col-end-${6 + 2 * index}`,
                    `lg:col-start-${1 + 2 * index} lg:col-end-${5 + 2 * index}`,
                    // `xl:col-start-${1 + 2 * index} xl:col-end-${5 + 2 * index}`,
                    "bg-black flex flex-col justify-center",
                    // index !== selected && "brightness-50",
                  )}
                  initial={{ opacity: 0 }}
                  key={`demo-arr-${index}`}
                  style={{
                    gridColumnStart: 1 + 2 * index,
                    gridColumnEnd: 6 + 2 * index,
                  }}
                  animate={{
                    opacity: 1,
                    zIndex: 20 - Math.abs(selected - index),
                    filter: isSelected ? "brightness(1)" : "brightness(0.5)",
                    transition: {
                      visualDuration: 2,
                    },
                  }}
                  onClick={() => {
                    setSelected(index);
                  }}
                >
                  <Image
                    key={`demo-arr-${index}-img`}
                    src={item.image}
                    alt={item.alt}
                    height={item.height}
                    width={item.width}
                    className={cn(
                      "w-full h-full object-cover object-center z-21 min-w-25",
                    )}
                  />
                  <motion.p
                    layout
                    className={cn(
                      "font-lp-text-xl-bold lg:max-xl:text-[13.5px] text-text-icons-on-color bg-transparent z-23 absolute bottom-2.5 lg:bottom-4 left-2.5 lg:left-4 w-[90%]",
                      // "font-pjs text-[6px] lg:text-lg font-bold leading-normal text-text-icons-on-color bg-transparent z-23 absolute bottom-2.5 lg:bottom-4 left-2.5 lg:left-4 w-[90%]",
                      // "font-pjs text-lg font-bold leading-normal text-text-icons-on-color bg-transparent z-23 absolute bottom-4 left-4 w-full",
                      !isSelected &&
                        (index > selected
                          ? "left-auto lg:left-auto right-2.5 lg:right-4 text-right w-1/2"
                          : "left-2.5 lg:left-4 text-left w-1/2"),
                    )}
                  >
                    {t(item.captionKey)}
                  </motion.p>
                  {isSelected && (
                    <motion.div
                      className="h-full w-full absolute top-0 z-22"
                      initial={{ y: "100%" }}
                      animate={{
                        y: 0,
                        transition: {
                          visualDuration: 2,
                        },
                      }}
                      style={{
                        background:
                          "linear-gradient(180deg,rgba(0,0,0,0) 0%, rgba(204, 71, 120, 0.3) 77%, rgba(204, 71, 120, 0.6) 90%, rgba(204, 71, 120, 0.8) 100%)",
                      }}
                    ></motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
          {/*  */}
          <div className="hidden lg:block space-y-4">
            <p className="text-center font-lp-headline-s-bold xl:font-lp-headline-xl-bold text-primary-red-pink-light">
              {t(demoArray[selected].captionKey)}
            </p>
            <p className="text-center font-lp-text-s-semibold xl:font-lp-headline-xs-medium text-text-icons-on-color">
              {t(demoArray[selected].descriptionKey)}
            </p>
          </div>
          <div className="block lg:hidden space-y-4">
            <div className="flex flex-row justify-between items-center gap-x-2 px-10">
              <Button
                disabled={selected === 0}
                className="rounded-full p-2 aspect-square h-6"
                // size={"icon"}
                style={{
                  paddingInline: 0,
                }}
                onClick={() => {
                  setSelected(selected - 1);
                  setDirection(-1);
                }}
              >
                <ChevronLeftIcon className="size-3.5" />
              </Button>

              <p className="text-center font-lp-headline-xxs-bold text-text-icons-on-color">
                {t(demoArray[selected].captionKey)}
              </p>
              <Button
                disabled={selected === 3}
                className="rounded-full p-2 aspect-square h-6"
                // size={"icon"}
                style={{
                  paddingInline: 0,
                }}
                onClick={() => {
                  setSelected(selected + 1);
                  setDirection(1);
                }}
              >
                <ChevronRightIcon className="size-3.5" />
              </Button>
            </div>
            {/* WIP NO DESIGN SYSTEM YET */}
            <p className="text-center font-pjs text-xs font-medium text-text-icons-on-color leading-normal px-6">
              {t(demoArray[selected].descriptionKey)}
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col items-center">
          {/* <Button className="px-5 py-1 lg:py-3 h-auto rounded-md">
            <p className="font-aptos text-[13px] lg:text-[13.5px] xl:text-lg font-semibold lg:font-bold text-text-icons-on-color">
              {t("lumaButtonCaption")}
            </p>
          </Button> */}
          {selected >= 0 && demoArray[selected] && (
            <>{demoArray[selected].buttonComponent}</>
          )}
        </div>
      </div>
      {/* <h1 className="text-4xl font-bold">Section 1</h1> */}
    </div>
  );
};
