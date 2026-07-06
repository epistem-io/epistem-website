"use client";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export const Hero = () => {
  const t = useTranslations("HomePage.Hero");

  return (
    <main className="flex lg:min-h-screen w-full flex-col items-center justify-center px-0">
      <div
        className="lg:h-screen w-full flex flex-col items-center justify-center px-3 max-lg:pt-45 space-y-0"
        style={{
          background: "linear-gradient(180deg, #FFE9F1 0%, #FFF 100%)",
        }}
      >
        <motion.p className="font-lp-headline-l-semibold lg:max-xl:font-lp-display-m-semibold xl:font-lp-display-l-semibold text-primary-pink text-center">
          {t("title1")}{" "}
        </motion.p>
        <motion.p className="font-lp-headline-l-semibold lg:max-xl:font-lp-display-m-semibold xl:font-lp-display-l-semibold text-primary-pink text-center">
          {t("title2")}
        </motion.p>
        <motion.p className="font-lp-text-xs-semibold lg:max-xl:font-lp-headline-xxs-semibold xl:font-lp-headline-xs-semibold text-primary-pink text-center mb-15 max-md:mb-25 mt-6">
          {t.rich("caption", {
            br: () => <br />,
          })}
        </motion.p>
      </div>
    </main>
  );
};
