"use client";

import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const directions = [
  { name: "Northbound", icon: <ArrowUp /> },
  { name: "Eastbound", icon: <ArrowRight /> },
  { name: "Southbound", icon: <ArrowDown /> },
  { name: "Westbound", icon: <ArrowLeft /> },
];

const Selectors = ({
  lines,
  possibleDirections,
}: {
  lines: string[];
  possibleDirections: string[];
}) => {
  const router = useRouter();
  const searchParams = useSearchParams()!;
  const pathname = usePathname();
  const selectedDirection = searchParams.get("directionName");
  const selectedLine = searchParams.get("id");

  console.log("Possible Directions: ", possibleDirections);
  console.log(
    "Acceptable Direction? ",
    possibleDirections.includes(selectedDirection!)
  );
  console.log("Lines: ", lines);

  useEffect(() => {
    function fixDirectionIfNotValid() {
      //if the selected direction is not one of the possible directions, select the first direction in the list
      if (!possibleDirections.includes(selectedDirection!)) {
        const currentParams = new URLSearchParams(
          Array.from(searchParams.entries())
        );
        currentParams.set("directionName", possibleDirections[0]);
        const search = currentParams.toString();
        const query = search ? `?${search}` : "";
        router.replace(`${pathname}${query}`);
      }
    }

    fixDirectionIfNotValid();
  }, [possibleDirections, selectedDirection, searchParams, pathname, router]);

  useEffect(() => {
    function addLineIdIfNotSelected() {
      //if no line is selected, select the first line in the list and add to url
      if (!selectedLine && lines.length > 0) {
        const firstLine = lines[0];
        const currentParams = new URLSearchParams(
          Array.from(searchParams.entries())
        );
        currentParams.set("id", firstLine);
        const search = currentParams.toString();
        const query = search ? `?${search}` : "";
        router.replace(`${pathname}${query}`);
      }
    }

    addLineIdIfNotSelected();
  }, [selectedLine, lines, searchParams, pathname, router]);

  return (
    <div>
      <label
        htmlFor="line-selector"
        className="block text-sm font-medium mb-2 dark:text-white"
      >
        Line
      </label>
      <div id="line-selector" className="mb-8 grid gap-2 grid-cols-4">
        {lines.map((line) => (
          <LineSelector
            key={line}
            line={line}
            selected={selectedLine == line}
          />
        ))}
      </div>

      <label
        htmlFor="direction-selector"
        className="block text-sm font-medium mb-2 dark:text-white"
      >
        Direction
      </label>
      <div id="direction-selector" className="mb-8 grid grid-cols-2 gap-2">
        {directions.map((direction) => (
          <DirectionSelector
            key={direction.name}
            icon={direction.icon}
            direction={direction.name}
            selected={selectedDirection == direction.name}
            disabled={!possibleDirections.includes(direction.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default Selectors;

const LineSelector = ({
  line,
  selected,
}: {
  line: string;
  selected: boolean;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const onClick = () => {
    const currentParams = new URLSearchParams(
      Array.from(searchParams.entries())
    );
    currentParams.set("id", line);
    // cast to string
    const search = currentParams.toString();
    // or const query = `${'?'.repeat(search.length && 1)}${search}`;
    const query = search ? `?${search}` : "";
    router.replace(`${pathname}${query}`);
  };

  return (
    <button
      onClick={onClick}
      name={line}
      className={`py-3 px-4 w-full border flex justify-center items-center transition-colors  rounded-md text-sm dark:text-gray-400 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-slate-700 ${
        selected
          ? "dark:border-gray-100 border-gray-400"
          : "border-gray-300 dark:border-gray-700"
      }`}
    >
      {line}
    </button>
  );
};

const DirectionSelector = ({
  direction,
  selected,
  icon,
  disabled,
}: {
  direction: string;
  selected: boolean;
  icon: JSX.Element;
  disabled: boolean;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const onClick = () => {
    const currentParams = new URLSearchParams(
      Array.from(searchParams.entries())
    );
    currentParams.set("directionName", direction);
    // cast to string
    const search = currentParams.toString();
    // or const query = `${'?'.repeat(search.length && 1)}${search}`;
    const query = search ? `?${search}` : "";
    router.replace(`${pathname}${query}`);
  };

  return (
    <button
      onClick={onClick}
      name={direction}
      disabled={disabled}
      className={`py-3 px-4 w-full border flex justify-center items-center transition-colors disabled:text-opacity-50 disabled:cursor-not-allowed rounded-md text-sm  dark:text-gray-400 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-slate-700 ${
        selected
          ? "dark:border-gray-100 border-gray-400"
          : "border-gray-300 dark:border-gray-700"
      }
      `}
    >
      <span className="pr-2">{icon}</span>
      {direction}
    </button>
  );
};
