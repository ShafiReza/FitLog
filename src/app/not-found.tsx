import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-8xl font-bold text-primary">404</h1>
      <h2 className="text-2xl font-bold uppercase tracking-wide mt-4">
        Page not found
      </h2>
      <p className="text-base-content/60 mt-2 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="btn btn-primary mt-8">
        Back to workouts
      </Link>
    </div>
  );
}
