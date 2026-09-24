"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const { planCount, savedCount } = usePlan();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-base-100/95 backdrop-blur border-b border-base-300">
      <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="navbar-start">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo.png"
              alt="FitLog"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="font-bold text-xl tracking-tight hidden sm:inline">
              FIT<span className="text-primary">LOG</span>
            </span>
          </Link>
        </div>

        {/* Center links */}
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal gap-1 px-1">
            <li>
              <Link
                href="/"
                className={`font-medium tracking-wide ${
                  isActive("/") ? "text-primary bg-primary/10" : "text-base-content/80"
                }`}
              >
                Workout
              </Link>
            </li>
            <li>
              <Link
                href="/my-plan"
                className={`font-medium tracking-wide ${
                  isActive("/my-plan") ? "text-primary bg-primary/10" : "text-base-content/80"
                }`}
              >
                My Plan
              </Link>
            </li>
          </ul>
        </div>

        {/* Right badges */}
        <div className="navbar-end gap-2">
          <Link
            href="/my-plan"
            className="badge badge-lg border-0 font-semibold px-3 py-3 bg-primary text-primary-content hover:brightness-110 transition"
          >
            Plan {planCount}
          </Link>
          <Link
            href="/my-plan"
            className="badge badge-lg badge-outline font-semibold px-3 py-3 border-base-content/40 text-base-content hover:border-primary hover:text-primary transition"
          >
            Saved {savedCount}
          </Link>

          {/* Mobile menu */}
          <div className="dropdown dropdown-end md:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-sm btn-square">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-20 w-40 p-2 shadow border border-base-300 mt-2">
              <li>
                <Link href="/" className={isActive("/") ? "active" : ""}>
                  Workout
                </Link>
              </li>
              <li>
                <Link href="/my-plan" className={isActive("/my-plan") ? "active" : ""}>
                  My Plan
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
