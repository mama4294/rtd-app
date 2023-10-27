import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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
      <body className=" min-h-screen px-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex flex-col">
          <Link
            href="/"
            className="text-2xl font-semibold my-12 rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            RTD Tracker
          </Link>
          {children}
        </div>
      </body>
      {/* <footer>I am the footer</footer> */}
    </html>
  );
}
