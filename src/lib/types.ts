export interface Workout {
  id: number | string;
  name: string;
  description: string;
  muscleGroups: string[];
  category?: string[]; // alias for compatibility
  equipment: string;
  difficulty: string;
  sets: number;
  reps: string;
  duration: number;
  caloriesBurned: number;
  calories?: number; // alias
  rating: number;
  image: string;
  instructions: string[];
}

export interface PlanItem extends Workout {
  addedAt: number;
  done?: boolean;
}

// Normalize API response to consistent shape
export function normalizeWorkout(raw: any): Workout {
  return {
    id: String(raw.id),
    name: raw.name,
    description: raw.description || "",
    muscleGroups: raw.muscleGroups || raw.category || [],
    category: raw.muscleGroups || raw.category || [],
    equipment: raw.equipment || "",
    difficulty: raw.difficulty || "Intermediate",
    sets: raw.sets || 0,
    reps: raw.reps || "",
    duration: raw.duration || 0,
    caloriesBurned: raw.caloriesBurned || raw.calories || 0,
    calories: raw.caloriesBurned || raw.calories || 0,
    rating: raw.rating || 0,
    image: raw.image || "/banner.png",
    instructions: raw.instructions || [],
  };
}
