import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RTD",
  description: "Get updates on nearby RTD lightrail lines",
};

export default function TrainLineDetails({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { trainLine: string };
}) {
  return (
    <section className={inter.className}>
      <h2 className="text-2xl font-semibold">
        {params.trainLine} Line Details
      </h2>
      {children}
    </section>
  );
}
