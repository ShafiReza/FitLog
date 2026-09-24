import { Workout, normalizeWorkout } from "./types";

const BASE_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function getAllWorkouts(): Promise<Workout[]> {
  const res = await fetch(BASE_URL, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Failed to fetch workouts");
  const data = await res.json();
  return Array.isArray(data) ? data.map(normalizeWorkout) : [];
}

export async function getWorkoutById(id: string): Promise<Workout | null> {
  const res = await fetch(`${BASE_URL}/${id}`, { next: { revalidate: 3600 } });
  if (!res.ok) return null;
  const data = await res.json();
  return normalizeWorkout(data);
}
