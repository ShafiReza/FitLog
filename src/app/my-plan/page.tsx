"use client";

import { useState, useMemo } from "react";
import { usePlan } from "@/context/PlanContext";
import MetricsSummary from "@/components/plan/MetricsSummary";
import PlanCard from "@/components/plan/PlanCard";
import EmptyState from "@/components/plan/EmptyState";
import SortDropdown from "@/components/ui/SortDropdown";
import { sortWorkouts, SortKey } from "@/lib/utils";
import { PlanItem } from "@/lib/types";

export default function MyPlanPage() {
  const { todayPlan, saved } = usePlan();
  const [tab, setTab] = useState<"plan" | "saved">("plan");
  const [sortKey, setSortKey] = useState<SortKey>("duration");

  const list = tab === "plan" ? todayPlan : saved;

  const sortedList = useMemo(
    () => sortWorkouts(list as PlanItem[], sortKey) as PlanItem[],
    [list, sortKey]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight">
          My Plan
        </h1>
        <p className="text-base-content/60 mt-2">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics — change with active tab */}
      <MetricsSummary tab={tab} />

      {/* Tabs + Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="tabs tabs-boxed bg-base-200 p-1 w-fit">
          <button
            className={`tab ${tab === "plan" ? "tab-active !bg-primary !text-primary-content" : ""}`}
            onClick={() => setTab("plan")}
          >
            Today&apos;s Plan ({todayPlan.length})
          </button>
          <button
            className={`tab ${tab === "saved" ? "tab-active !bg-primary !text-primary-content" : ""}`}
            onClick={() => setTab("saved")}
          >
            Saved ({saved.length})
          </button>
        </div>

        <SortDropdown value={sortKey} onChange={setSortKey} />
      </div>

      {/* List */}
      {sortedList.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-4">
          {sortedList.map((item) => (
            <PlanCard key={item.id} item={item} mode={tab} />
          ))}
        </div>
      )}
    </div>
  );
}
