import Link from "next/link";
import Image from "next/image";
import { Workout } from "@/lib/types";

interface Props {
  workout: Workout;
}

export default function WorkoutCard({ workout }: Props) {
  const tags = workout.muscleGroups || workout.category || [];
  const calories = workout.caloriesBurned || workout.calories || 0;

  return (
    <Link
      href={`/workout/${workout.id}`}
      className="card bg-base-200 border border-base-300 hover:border-primary/50 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 group overflow-hidden"
    >
      {/* Image */}
      <figure className="relative h-44 bg-base-300 overflow-hidden">
        <Image
          src={workout.image || "/banner.png"}
          alt={workout.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </figure>

      <div className="card-body p-4 gap-3">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.map((cat) => (
            <span
              key={cat}
              className="badge badge-sm badge-outline border-base-content/30 text-xs uppercase tracking-wider"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Name */}
        <h3 className="card-title text-base font-bold uppercase tracking-wide leading-snug group-hover:text-primary transition-colors">
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="text-sm text-base-content/60 flex items-center gap-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          {workout.equipment}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-3 text-xs text-base-content/70 pt-1 border-t border-base-300 mt-1">
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            </svg>
            {calories} kcal
          </span>
          <span className="flex items-center gap-1 ml-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
