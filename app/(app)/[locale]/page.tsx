// import { Button } from "@/components/ui/button";
// import Image from "next/image";
import { Hero } from "./components/hero";
import { Section1 } from "./components/section-1";
import { Section2 } from "./components/section-2";
import { Section3 } from "./components/section-3";
import { Section4 } from "./components/section-4";
import { Events } from "./components/events";
import { ContactUs } from "./components/contact-us";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-start">
      <Hero />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Events />
      <ContactUs />
    </div>
  );
}
