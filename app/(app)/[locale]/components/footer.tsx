"use client";

import Image from "next/image";
// import { useRef, useState } from "react";
// import { useInView } from "motion/react";

export const Footer = () => {
  // const [isOpen, setIsOpen] = useState(false);

  // const imageComp = useRef(null);
  // const imageMobile = useRef(null);
  // const textComp = useRef(null);

  // const imageIsInView = useInView(imageComp, { once: true });
  // const imageMobileIsInView = useInView(imageMobile, { once: true });
  // const textIsInView = useInView(textComp, { once: true });

  return (
    <>
      <div className="w-full py-6 lg:py-17 px-1 lg:px-28 bg-primary-pink-light-hover">
        <div className="flex flex-col items-center justify-start w-full max-w-335.5 px-2">
          <div className="flex flex-col w-full gap-y-2.5 lg:gap-y-10">
            <Image
              src="/images/restore-logo.webp"
              alt="restore-log"
              width={982}
              height={254}
              className="hidden lg:block w-37 lg:w-50 lg:mr-auto"
            />
            <div className="flex flex-col lg:flex-row lg:justify-between max-lg:items-center lg:items-start lg:gap-x-9">
              <div className="">
                <Image
                  src="/images/restore-logo.webp"
                  alt="restore-log"
                  width={982}
                  height={254}
                  className="block lg:hidden w-37 lg:w-50 lg:mr-auto"
                />
                <p className="block lg:hidden font-inter text-black text-[10px] font-bold mb-2.5 text-left mt-3">
                  Supported by:
                </p>
                <div className="flex flex-row gap-x-5 lg:gap-x-15 gap-y-5 max-lg:items-start">
                  <Image
                    src="/images/bundes.webp"
                    alt="bundes mobile logo"
                    width={300}
                    height={144}
                    className="block lg:hidden w-45 lg:w-62 h-auto object-contain"
                  />
                  <Image
                    src="/images/bundes-logo.webp"
                    alt="bundes logo"
                    width={277}
                    height={169}
                    className="hidden lg:block w-34 lg:w-62 h-auto object-contain"
                  />
                  <Image
                    src="/images/iki-logo.webp"
                    alt="iki logo"
                    width={900}
                    height={208}
                    className="w-full max-w-34 lg:w-70 h-auto object-contain"
                  />
                </div>
              </div>
              <div className="space-y-3.5 lg:space-y-5 max-lg:mt-9">
                <p className="text-[10px] lg:text-sm font-inter font-bold text-black">
                  Initiated by:
                </p>
                <div className="flex flex-row gap-x-13 lg:gap-x-15 max-lg:justify-between">
                  <Image
                    src="/images/iiasa-logo.webp"
                    alt="iiasa logo"
                    width={201}
                    height={282}
                    className="w-14 lg:w-17"
                  />
                  <div className="">
                    <Image
                      src="/images/cifor-logo.webp"
                      alt="cifor logo"
                      width={678}
                      height={285}
                      className="w-50 lg:w-56 h-auto"
                    />
                  </div>
                </div>

                <Image
                  src="/images/wri-logo.webp"
                  alt="wri logo"
                  width={1024}
                  height={207}
                  className="w-57 lg:w-70 max-lg:mx-auto max-lg:mt-1.5"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-10 w-full bg-primary-red-pink-light-active"></div>
    </>
  );
};
