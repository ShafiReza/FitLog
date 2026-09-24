
export default function LoadingSpinner({ text = "Loading workouts…" }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <p className="text-base-content/70 text-sm tracking-wide">{text}</p>
    </div>
  );
}
