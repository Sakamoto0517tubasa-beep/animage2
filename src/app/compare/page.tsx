import { Suspense } from "react";
import CompareClient from "./CompareClient";

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <CompareClient />
    </Suspense>
  );
}
