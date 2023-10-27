"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

const Selectors = () => {
  return (
    <div className="mb-8 flex justify-between gap-2">
      <Dropdown label="Line" name="id" options={["E", "D", "H"]} />
      <Dropdown
        label="Direction"
        name="directionName"
        options={["Northbound", "Southbound"]}
      />
    </div>
  );
};

export default Selectors;

const Dropdown = ({
  label,
  options,
  name,
}: {
  label: string;
  name: string;
  options: string[];
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const currentParams = new URLSearchParams(
      Array.from(searchParams.entries())
    );
    // update as necessary
    const value = event.target.value.trim();

    if (!value) {
      currentParams.delete(event.target.name);
    } else {
      currentParams.set(event.target.name, event.target.value);
    }

    // cast to string
    const search = currentParams.toString();
    // or const query = `${'?'.repeat(search.length && 1)}${search}`;
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  let selectedValue = searchParams.get(name); // Get the selected value from URL

  if (!selectedValue) {
    selectedValue = options[0];
  }

  return (
    <div className="mb-2 flex-1">
      <label
        htmlFor="select-1"
        className="block text-sm font-medium mb-2 dark:text-white"
      >
        {label}
      </label>
      <select
        id="select-1"
        className="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
        onChange={onSelect}
        name={name}
        value={selectedValue}
      >
        {options.map((option: string) => {
          return <option key={option}>{option}</option>;
        })}
      </select>
    </div>
  );
};
