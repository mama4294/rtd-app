import Link from "next/link";
import React from "react";

function Header() {
  return (
    <header className="top-0 z-50 my-4 flex justify-center">
      <Link
        href="/"
        prefetch={false}
        className="text-2xl font-semibold rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      >
        RTD Tracker
      </Link>
    </header>
  );
}

export default Header;
