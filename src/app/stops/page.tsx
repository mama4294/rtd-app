import Link from "next/link";

const stops = [
  {
    name: "I-25 / Broadway Station",
    id: 33686,
  },
  {
    name: "Union Station",
    id: 33727,
  },
  {
    name: "Denver Airport",
    id: 34503,
  },
];

export default function Page() {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Stations</h2>
      <div className="mb-32 grid text-left lg:max-w-5xl lg:w-full lg:mb-0 lg:text-left lg:justify-between gap-4">
        {stops.map((stop) => (
          <Link
            href={`/stops/${stop.id}`}
            key={stop.id}
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              {stop.name}{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
          </Link>
        ))}
      </div>
    </>
  );
}
