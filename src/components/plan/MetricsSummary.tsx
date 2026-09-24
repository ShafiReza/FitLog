"use client";

import { usePlan } from "@/context/PlanContext";
import { PlanItem } from "@/lib/types";

interface Props {
  tab: "plan" | "saved";
}

export default function MetricsSummary({ tab }: Props) {
  const { todayPlan, saved } = usePlan();

  const list: PlanItem[] = tab === "plan" ? todayPlan : saved;

  const exercises = list.length;
  const minutes = list.reduce((sum, w) => sum + (w.duration || 0), 0);
  const calories = list.reduce(
    (sum, w) => sum + (w.caloriesBurned || w.calories || 0),
    0
  );

  const stats = [
    { label: "Exercises", value: exercises },
    { label: "Minutes", value: minutes },
    { label: "Calories", value: calories },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {stats.map((s) => (
        <div
          key={s.label}
          className="stat bg-base-200 border border-base-300 rounded-box p-4"
        >
          <div className="stat-title text-xs uppercase tracking-wider opacity-70">
            {s.label}
          </div>
          <div className="stat-value text-3xl text-primary">{s.value}</div>
        </div>
      ))}
    </div>
  );
}
