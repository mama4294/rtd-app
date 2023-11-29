import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RTD",
  description: "Get updates on nearby RTD lightrail lines",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="text-black dark:text-white">
      {/* <nav>I am the navbar</nav> */}
      <body className="flex flex-col min-h-screen lg:px-24 px-6">
        <Header />
        <div className="flex-1 flex justify-center">{children}</div>
        <Footer />
      </body>

      {/* <footer>I am the footer</footer> */}
    </html>
  );
}
