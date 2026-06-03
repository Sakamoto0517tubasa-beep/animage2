import HeaderNav, { HeaderLogo } from "@/components/HeaderNav";
import { getCurrentUser } from "@/lib/auth";

export default async function AnimageHeader() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0f0f0f]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <HeaderLogo />
        <HeaderNav user={user} />
      </div>
    </header>
  );
}
