import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoWordmarkProps = {
  className?: string;
  href?: string;
  as?: "h1" | "span";
};

export default function LogoWordmark({
  className,
  href,
  as: Tag = "span",
}: LogoWordmarkProps) {
  const classes = cn(
    "font-logo text-[1.75rem] leading-none font-bold tracking-[0.05em] sm:text-3xl",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        Animeji
      </Link>
    );
  }

  return <Tag className={cn(classes, Tag === "h1" && "text-center")}>Animeji</Tag>;
}
