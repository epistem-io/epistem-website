import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { NavBar } from "./components/nav-bar";
import { Footer } from "./components/footer";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

import { GoogleAnalytics } from "@next/third-parties/google";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const pjs = Plus_Jakarta_Sans({
  variable: "--font-pjs",
  subsets: ["latin"],
});

const degularDisplay = localFont({
  src: [
    {
      path: "../../../public/fonts/DegularDisplayDemo-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/DegularDisplayDemo-Medium.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-degular-display",
});

const aptos = localFont({
  src: [
    {
      path: "../../../public/fonts/Aptos-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Aptos.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Aptos-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Aptos-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Aptos-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Aptos-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Aptos-Light-Italic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../../public/fonts/Aptos-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../../public/fonts/Aptos-SemiBold-Italic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../../public/fonts/Aptos-Bold-Italic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../../public/fonts/Aptos-ExtraBold-Italic.ttf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../../../public/fonts/Aptos-Black-Italic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-aptos",
});

export const metadata: Metadata = {
  title: "Inclusive LULC Data Generation",
  description:
    "Evolving Participatory Information System for Nature-based Climate Solutions. Data Empowerment: The Epistem initiative aims to develop an open-source landscape monitoring technology that can address multiple thematic requirements of diverse actors and stakeholders of nature-based climate solutions.",
};

export default async function TestLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${pjs.variable} ${aptos.variable} ${degularDisplay.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <NavBar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
      <GoogleAnalytics gaId={process.env.GA_ID || "error GA"} />
    </html>
  );
}
