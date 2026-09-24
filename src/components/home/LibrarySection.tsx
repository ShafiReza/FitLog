"use client";

import { useWorkouts } from "@/hooks/useWorkouts";
import WorkoutCard from "./WorkoutCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function LibrarySection() {
  const { workouts, loading, error } = useWorkouts();

  return (
    <section id="library" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight">
          The Library
        </h2>
        <p className="text-base-content/60 mt-2">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* Content */}
      {loading && <LoadingSpinner />}
      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {workouts.map((w) => (
            <WorkoutCard key={w.id} workout={w} />
          ))}
        </div>
      )}
    </section>
  );
}
