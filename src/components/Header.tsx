import Link from "next/link";
import React from "react";
import Logo from "./Logo";

function Header() {
  return (
    <header className="top-0 z-50 my-4 flex justify-center">
      <Link
        href="/"
        prefetch={false}
        className="flex items-center text-2xl font-semibold rounded-lg border border-transparent px-5 py-2 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      >
        <Logo />
        Tracker
      </Link>
    </header>
  );
}

export default Header;
