import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RTD",
  description: "Get updates on nearby RTD lightrail lines",
};

export default function Layout({
  children,
  params,
  searchParams,
}: {
  children: React.ReactNode;
  params: { stopID: string };
  searchParams: { [key: string]: string };
}) {
  return <section className={inter.className}>{children}</section>;
}
