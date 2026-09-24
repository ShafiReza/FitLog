"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { PlanItem, Workout } from "@/lib/types";
import { toast } from "react-toastify";

interface PlanContextType {
  todayPlan: PlanItem[];
  saved: PlanItem[];
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: string) => void;
  removeFromSaved: (id: string) => void;
  markAsDone: (id: string) => void;
  isInPlan: (id: string) => boolean;
  isSaved: (id: string) => boolean;
  planCount: number;
  savedCount: number;
  totalMinutes: number;
  totalCalories: number;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

const PLAN_KEY = "fitlog_today_plan";
const SAVED_KEY = "fitlog_saved";

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [todayPlan, setTodayPlan] = useState<PlanItem[]>([]);
  const [saved, setSaved] = useState<PlanItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Keep latest values in refs so callbacks stay stable
  const planRef = useRef(todayPlan);
  const savedRef = useRef(saved);
  planRef.current = todayPlan;
  savedRef.current = saved;

  // Load from localStorage (once)
  useEffect(() => {
    try {
      const planRaw = localStorage.getItem(PLAN_KEY);
      const savedRaw = localStorage.getItem(SAVED_KEY);
      if (planRaw) setTodayPlan(JSON.parse(planRaw));
      if (savedRaw) setSaved(JSON.parse(savedRaw));
    } catch (e) {
      console.error("Failed to load plan data", e);
    }
    setHydrated(true);
  }, []);

  // Persist
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(PLAN_KEY, JSON.stringify(todayPlan));
  }, [todayPlan, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved, hydrated]);

  const addToPlan = useCallback((workout: Workout) => {
    const prev = planRef.current;

    if (prev.length >= 5) {
      toast.warn("Plan is full (max 5 lifts)");
      return;
    }
    if (prev.some((w) => String(w.id) === String(workout.id))) {
      toast.info("Already in today's plan");
      return;
    }

    setTodayPlan((p) => [
      ...p,
      { ...workout, addedAt: Date.now(), done: false },
    ]);
    toast.success("Added to today's plan");
  }, []);

  const addToSaved = useCallback((workout: Workout) => {
    const prev = savedRef.current;

    if (prev.some((w) => String(w.id) === String(workout.id))) {
      toast.info("Already saved");
      return;
    }

    setSaved((p) => [...p, { ...workout, addedAt: Date.now() }]);
    toast.success("Saved for later");
  }, []);

  const removeFromPlan = useCallback((id: string) => {
    setTodayPlan((prev) => prev.filter((w) => String(w.id) !== id));
    toast.info("Removed from plan");
  }, []);

  const removeFromSaved = useCallback((id: string) => {
    setSaved((prev) => prev.filter((w) => String(w.id) !== id));
    toast.info("Removed from saved");
  }, []);

  const markAsDone = useCallback((id: string) => {
    setTodayPlan((prev) =>
      prev.map((w) => (String(w.id) === id ? { ...w, done: true } : w))
    );
    toast.success("Marked as done!");
  }, []);

  const isInPlan = useCallback(
    (id: string) => planRef.current.some((w) => String(w.id) === id),
    []
  );

  const isSaved = useCallback(
    (id: string) => savedRef.current.some((w) => String(w.id) === id),
    []
  );

  // Metrics: Exercises = today's plan count
  // Minutes & Calories = Today's Plan + Saved combined
  const planCount = todayPlan.length;
  const savedCount = saved.length;

  const allItems = [...todayPlan, ...saved];
  const totalMinutes = allItems.reduce((sum, w) => sum + (w.duration || 0), 0);
  const totalCalories = allItems.reduce(
    (sum, w) => sum + (w.caloriesBurned || w.calories || 0),
    0
  );

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        saved,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
        isInPlan,
        isSaved,
        planCount,
        savedCount,
        totalMinutes,
        totalCalories,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}
