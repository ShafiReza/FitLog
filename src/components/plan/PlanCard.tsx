"use client";

import Link from "next/link";
import Image from "next/image";
import { PlanItem } from "@/lib/types";
import { usePlan } from "@/context/PlanContext";

interface Props {
  item: PlanItem;
  mode: "plan" | "saved";
}

export default function PlanCard({ item, mode }: Props) {
  const { removeFromPlan, removeFromSaved, markAsDone } = usePlan();
  const calories = item.caloriesBurned || item.calories || 0;

  const handleRemove = () => {
    if (mode === "plan") removeFromPlan(String(item.id));
    else removeFromSaved(String(item.id));
  };

  return (
    <div
      className={`card card-side bg-base-200 border border-base-300 overflow-hidden ${
        item.done ? "opacity-60" : ""
      }`}
    >
      {/* Thumbnail */}
      <figure className="relative w-28 sm:w-36 shrink-0 bg-base-300">
        <Image
          src={item.image || "/banner.png"}
          alt={item.name}
          fill
          className="object-cover"
          sizes="150px"
        />
      </figure>

      <div className="card-body p-4 gap-2 justify-between">
        <div>
          <h3 className="font-bold uppercase tracking-wide text-sm sm:text-base leading-snug">
            {item.name}
            {item.done && (
              <span className="badge badge-success badge-sm ml-2">Done</span>
            )}
          </h3>
          <p className="text-xs text-base-content/60 mt-1">{item.equipment}</p>

          {/* Stats */}
          <div className="flex items-center gap-3 text-xs text-base-content/70 mt-2">
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {item.duration} min
            </span>
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
              {calories} kcal
            </span>
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {item.rating}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 mt-2">
          <Link
            href={`/workout/${item.id}`}
            className="btn btn-xs btn-ghost border border-base-300"
          >
            View Details
          </Link>

          {mode === "plan" && !item.done && (
            <button
              onClick={() => markAsDone(String(item.id))}
              className="btn btn-xs btn-success gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Mark as Done
            </button>
          )}

          <button
            onClick={handleRemove}
            className="btn btn-xs btn-ghost text-error hover:bg-error/10"
            aria-label="Remove"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
