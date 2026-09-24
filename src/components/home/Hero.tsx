import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-base-100 border-b border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div className="space-y-6 order-2 lg:order-1">
            <p className="text-primary font-semibold tracking-[0.2em] text-sm uppercase">
              Workout Library
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase leading-tight tracking-tight">
              Train with intent.
              <br />
              Log every set.
            </h1>
            <p className="text-base-content/70 text-lg max-w-lg leading-relaxed">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into
              today&apos;s plan, and watch the week&apos;s work add up.
            </p>
            <div>
              <a
                href="#library"
                className="btn btn-primary btn-lg gap-2 font-semibold tracking-wide"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
                Browse Workouts
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg aspect-square">
              <Image
                src="/banner.png"
                alt="Workout illustration"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
