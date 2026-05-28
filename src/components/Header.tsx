import Link from "next/link";
import SiteLogo from "@/components/SiteLogo";

export default function Header() {
  return (
    <header className="relative bg-navy-deep/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center">
          <SiteLogo />
        </Link>
        <nav className="flex gap-6 text-sm font-medium tracking-wide">
          <Link
            href="/"
            className="text-white/70 transition-colors hover:text-gold"
          >
            シミュレーター
          </Link>
          <Link
            href="/compare"
            className="text-white/70 transition-colors hover:text-gold"
          >
            地域比較
          </Link>
        </nav>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
    </header>
  );
}
