"use client";

import { useTranslations } from "next-intl";

export function LumaFooter() {
  const t = useTranslations("LumaFooter");

  return (
    <footer className="luma-footer">
      <div className="luma-footer__inner">
        <p className="luma-footer__copy">{t("copyright")}</p>
        <nav className="luma-footer__links" aria-label={t("navLabel")}>
          <a href="#">{t("privacyPolicy")}</a>
          <a href="#">{t("termsOfUse")}</a>
        </nav>
      </div>
    </footer>
  );
}
