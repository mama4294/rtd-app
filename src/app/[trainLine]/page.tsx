import Link from "next/link";
import { Train } from "../types";

const url = "https://www.rtd-denver.com/api/v2/nextride/routes/E/vehicles";
const headers = new Headers({
  authority: "www.rtd-denver.com",
  accept: "*/*",
  "accept-language": "en-US,en;q=0.9",
  "api-key": "e7b926a1-cddb-46e7-bb27-6d134e5b5feb",
  dnt: "1",
  "if-none-match": 'W/"9c5-oXAWjEx6QWwhR6cnavtSTc3zKwQ"',
  origin: "https://app.rtd-denver.com",
  referer: "https://app.rtd-denver.com/",
});

const request = new Request(url, {
  method: "GET",
  headers: headers,
});

async function getTrains() {
  const res = await fetch(request);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
export default async function Page() {
  const data = await getTrains();

  return (
    <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:text-left lg:justify-between gap-4 grid-cols-3">
      {data.map((train: Train) => {
        return Train(train);
      })}
    </div>
  );
}

const Train = (props: Train) => {
  const { label, directionName, currentStop, headsign, id } = props;
  return (
    <Link
      href={`/trains/${id}`}
      className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    >
      <h2 className={`mb-3 text-2xl font-semibold`}>
        Train {label}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </h2>

      {currentStop && (
        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
          At {currentStop.name}
        </p>
      )}
      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
        {directionName} to {headsign}
      </p>
    </Link>
  );
};
