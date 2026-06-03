import Link from "next/link";

export default function AnimageFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0f0f0f]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-lg font-bold text-white">animage</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
              Discover and review anime pilgrimage spots across Japan. Real
              scores from fans who have been there.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-white/80">
              Explore
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li>
                <Link href="/spots" className="transition-colors hover:text-violet-400">
                  Spot Map
                </Link>
              </li>
              <li>
                <Link href="/" className="transition-colors hover:text-violet-400">
                  Recommended Spots
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-white/80">
              Account
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li>
                <Link
                  href="/auth/login"
                  className="transition-colors hover:text-violet-400"
                >
                  Log in
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/register"
                  className="transition-colors hover:text-violet-400"
                >
                  Create account
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="transition-colors hover:text-violet-400"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} animage. Anime pilgrimage reviews for
          travelers.
        </div>
      </div>
    </footer>
  );
}
