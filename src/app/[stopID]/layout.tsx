import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RTD",
  description: "Get updates on nearby RTD lightrail lines",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
