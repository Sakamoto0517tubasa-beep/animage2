"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SearchBarProps = {
  defaultValue?: string;
  placeholder?: string;
  actionPath?: string;
  size?: "default" | "large";
};

export default function SearchBar({
  defaultValue = "",
  placeholder = "Search anime locations",
  actionPath = "/spots",
  size = "default",
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    const params = trimmed ? `?q=${encodeURIComponent(trimmed)}` : "";
    router.push(`${actionPath}${params}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400" />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          className={
            size === "large"
              ? "h-11 rounded-full border-gray-200 bg-white pl-10 text-sm text-gray-900 placeholder:text-gray-400"
              : "h-10 rounded-full border-gray-200 bg-white pl-10 text-sm text-gray-900 placeholder:text-gray-400"
          }
        />
      </div>
      <Button
        type="submit"
        className="rounded-full bg-[#E53935] hover:bg-[#D32F2F]"
      >
        Search
      </Button>
    </form>
  );
}
