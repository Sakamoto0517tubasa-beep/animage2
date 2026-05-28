"use client";

import Image from "next/image";
import { useState } from "react";

export default function SiteLogo() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <span className="text-base font-bold tracking-widest text-white sm:text-lg">
        MUSUBI
      </span>
    );
  }

  return (
    <Image
      src="/logo.png"
      alt="MUSUBI - 外国人のための相談・サポート"
      width={200}
      height={45}
      className="h-[45px] w-auto mix-blend-multiply"
      priority
      onError={() => setHasError(true)}
    />
  );
}
