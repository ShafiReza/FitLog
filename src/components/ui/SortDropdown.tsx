"use client";

import { SortKey } from "@/lib/utils";

interface Props {
  value: SortKey;
  onChange: (key: SortKey) => void;
}

const OPTIONS: { value: SortKey; label: string }[] = [
  { value: "duration", label: "Duration" },
  { value: "calories", label: "Calories" },
  { value: "rating", label: "Rating" },
];

export default function SortDropdown({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-base-content/70 font-medium whitespace-nowrap">
        Sort By
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortKey)}
          className="select select-bordered select-sm bg-base-200 border-base-300 text-base-content font-semibold pr-8 min-w-[140px] focus:outline-none focus:border-primary"
        >
          {OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
