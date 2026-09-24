import Link from "next/link";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
      <h3 className="text-2xl font-bold uppercase tracking-wide text-base-content/40">
        Nothing here yet
      </h3>
      <p className="text-base-content/60 max-w-sm">
        Browse the library and add a lift to get today moving.
      </p>
      <Link href="/" className="btn btn-primary btn-wide mt-2">
        Go to workouts
      </Link>
    </div>
  );
}
