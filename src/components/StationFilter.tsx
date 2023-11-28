"use client";
import stops from "@/constants/Stops";
import { ArrowRight, SearchIcon, XCircle } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

function StationFilter() {
  const [filterText, setFilterText] = useState("");

  const filteredStops = stops.filter((stop) => {
    // Adjust the condition based on your filtering criteria
    return stop.name.toLowerCase().includes(filterText.toLowerCase());
  });

  console.log(filteredStops);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setFilterText(inputValue);
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Stations</h2>
      <div className="mb-4">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none h-full">
            <SearchIcon className="h-6 w-6" />
          </div>
          <input
            id="search"
            type="text"
            className="w-full ps-12 rounded-lg border border-slate-900 dark:border-gray-300 bg-transparent px-5 py-4 text-lg  focus:border-gray-500 focus:ring-0"
            placeholder="Search stations..."
            value={filterText}
            onChange={onChange}
          />
          {filterText && (
            <button
              className="absolute inset-y-0 end-0 pe-3 flex items-center ps-3 h-full"
              onClick={() => setFilterText("")}
            >
              <XCircle className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>
      <div className="mb-32 grid text-left lg:w-full lg:mb-0 lg:text-left lg:justify-between gap-2">
        {filteredStops.map((stop) => (
          <Link
            href={`/stops/${stop.id}`}
            key={stop.id}
            className="group rounded-lg bg-transparent border border-slate-900  dark:border-gray-300 px-5 py-4 transition-colors hover:bg-gray-100 hover:dark:bg-slate-600"
          >
            <h2 className="text-sm md:text-lg font-semibold">
              {stop.name}{" "}
              <ArrowRight className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
            </h2>
          </Link>
        ))}
      </div>
    </>
  );
}

export default StationFilter;
