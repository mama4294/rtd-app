import Link from "next/link";

export default function Home() {
  return (
    <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:text-left lg:justify-between gap-4">
      <Link
        href="/stops"
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      >
        <h2 className={`mb-3 text-2xl font-semibold`}>
          Stations
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
      </Link>
    </div>
  );
}
