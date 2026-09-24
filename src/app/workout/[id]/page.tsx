
import { notFound } from "next/navigation";
import Image from "next/image";
import { getWorkoutById } from "@/lib/api";
import WorkoutActions from "@/components/workout/WorkoutActions";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function WorkoutDetailPage({ params }: Props) {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  if (!workout) notFound();

  const tags = workout.muscleGroups || workout.category || [];
  const calories = workout.caloriesBurned || workout.calories || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        {/* Left — Image */}
        <div className="relative aspect-[4/5] lg:aspect-square rounded-2xl overflow-hidden bg-base-200 border border-base-300">
          <Image
            src={workout.image || "/banner.png"}
            alt={workout.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Right — Content */}
        <div className="space-y-8">
          {/* Title + tags */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight leading-tight">
              {workout.name}
            </h1>
            <p className="text-base-content/70 mt-3 leading-relaxed">
              {workout.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((cat) => (
                <span
                  key={cat}
                  className="badge badge-outline border-base-content/30 uppercase tracking-wider"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Specs */}
          <div className="bg-base-200 border border-base-300 rounded-xl overflow-hidden">
            <div className="grid grid-cols-2 sm:grid-cols-3 divide-x divide-y divide-base-300">
              {[
                { label: "Equipment", value: workout.equipment },
                { label: "Difficulty", value: workout.difficulty },
                { label: "Sets", value: workout.sets },
                { label: "Reps", value: workout.reps },
                { label: "Duration", value: `${workout.duration} min` },
                { label: "Calories", value: `${calories} kcal` },
                { label: "Rating", value: workout.rating },
              ].map((s) => (
                <div key={s.label} className="p-4">
                  <p className="text-xs uppercase tracking-wider text-base-content/50 mb-1">
                    {s.label}
                  </p>
                  <p className="font-semibold">{s.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide mb-4">
              Instructions
            </h2>
            <ol className="space-y-4">
              {(workout.instructions || []).map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-content font-bold flex items-center justify-center text-sm">
                    {i + 1}
                  </span>
                  <p className="text-base-content/80 leading-relaxed pt-1">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Actions */}
          <WorkoutActions workout={workout} />
        </div>
      </div>
    </div>
  );
}
