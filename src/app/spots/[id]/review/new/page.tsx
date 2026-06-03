import { notFound } from "next/navigation";
import ReviewForm from "@/components/ReviewForm";
import { getSpotById } from "@/lib/spots";

type NewReviewPageProps = {
  params: Promise<{ id: string }>;
};

export default async function NewReviewPage({ params }: NewReviewPageProps) {
  const { id } = await params;
  const spot = await getSpotById(id);

  if (!spot) {
    notFound();
  }

  return (
    <div className="px-4 py-4">
      <p className="text-xs text-gray-400">「{spot.anime_title}」の聖地</p>
      <h2 className="mt-1 text-lg font-bold text-gray-900">{spot.location_name}</h2>
      <p className="mt-1 text-sm text-gray-500">この聖地での体験をシェアしよう</p>

      <div className="mt-6">
        <ReviewForm spot={spot} />
      </div>
    </div>
  );
}
