
"use client";

import { useEffect, useState } from "react";
import { getAllWorkouts } from "@/lib/api";
import { Workout } from "@/lib/types";

export function useWorkouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const data = await getAllWorkouts();
        if (!cancelled) setWorkouts(data);
      } catch (e) {
        if (!cancelled) setError("Failed to load workouts");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { workouts, loading, error };
}
