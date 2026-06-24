import NavShell from "@/components/mobile/NavShell";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { cn } from "@/lib/utils";

export default function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn("mx-auto min-h-screen max-w-lg bg-white text-gray-900 pb-[calc(4.5rem+env(safe-area-inset-bottom))]")}>
      <NavShell>{children}</NavShell>
      <LanguageSwitcher />
    </div>
  );
}
