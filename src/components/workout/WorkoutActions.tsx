
"use client";

import { Workout } from "@/lib/types";
import { usePlan } from "@/context/PlanContext";

interface Props {
  workout: Workout;
}

export default function WorkoutActions({ workout }: Props) {
  const { addToPlan, addToSaved, isInPlan, isSaved, planCount } = usePlan();

  const planFull = planCount >= 5;
  const alreadyInPlan = isInPlan(String(workout.id));
  const alreadySaved = isSaved(String(workout.id));

  return (
    <div className="flex flex-col sm:flex-row gap-3 pt-2">
      <button
        onClick={() => addToPlan(workout)}
        disabled={planFull || alreadyInPlan}
        className="btn btn-primary btn-lg gap-2 flex-1 disabled:opacity-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        {alreadyInPlan
          ? "Already in plan"
          : planFull
          ? "Plan full (5/5)"
          : "Add to today's plan"}
      </button>

      <button
        onClick={() => addToSaved(workout)}
        disabled={alreadySaved}
        className="btn btn-outline btn-lg gap-2 flex-1 border-base-content/30 hover:border-primary hover:text-primary disabled:opacity-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
        {alreadySaved ? "Already saved" : "Save for later"}
      </button>
    </div>
  );
}
