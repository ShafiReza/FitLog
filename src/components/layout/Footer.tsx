
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-base-200 border-t border-base-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog" width={28} height={28} className="w-7 h-7" />
          <span className="font-bold text-lg tracking-tight">
            FIT<span className="text-primary">LOG</span>
          </span>
        </Link>
        <p className="text-sm text-base-content/60 text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
