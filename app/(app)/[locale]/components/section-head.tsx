import { motion, useInView } from "motion/react";
import { ReactNode, useRef } from "react";

interface Props {
  title: string | ReactNode;
  caption: string;
}

export const SectionHead = ({ title, caption }: Props) => {
  const titleComp = useRef(null);
  const titleIsInView = useInView(titleComp, { once: true });

  return (
    <div className="grid grid-cols-12 w-full gap-y-3 gap-x-3 px-0">
      <motion.div
        ref={titleComp}
        className="col-span-12 lg:col-span-6 flex flex-row items-center"
      >
        <p className="w-full font-lp-headline-xxs-bold lg:max-xl:font-lp-headline-l-bold xl:font-lp-headline-xl-bold text-center lg:text-left text-gray-700">
          {title}
        </p>
      </motion.div>
      <motion.div className="max-lg:col-span-12 lg:col-span-6 flex flex-row items-center justify-end">
        <p className="w-full font-lp-text-xs-regular lg:max-xl:font-lp-text-l-regular lg:font-lp-text-xl-regular text-text-icons-base-main text-center lg:text-justify">
          {caption}
        </p>
      </motion.div>
    </div>
  );
};
