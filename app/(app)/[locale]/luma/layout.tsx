import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Land Use Mapping for All",
};

export default function LumaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
