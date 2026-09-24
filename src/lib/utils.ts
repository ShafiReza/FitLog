
import { Workout } from "./types";

export type SortKey = "duration" | "calories" | "rating";

export function sortWorkouts(workouts: Workout[], key: SortKey): Workout[] {
  return [...workouts].sort((a, b) => {
    if (key === "duration") return a.duration - b.duration;
    if (key === "calories") return (a.caloriesBurned || a.calories || 0) - (b.caloriesBurned || b.calories || 0);
    return b.rating - a.rating; // higher rating first
  });
}

export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}