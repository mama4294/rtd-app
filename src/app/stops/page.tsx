import Link from "next/link";

export default function Page() {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Stations</h2>
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:text-left lg:justify-between gap-4">
        <Link
          href="/stops/33686"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            I-25 / Broadway Station
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Station 33686</p>
        </Link>
      </div>
    </>
  );
}
