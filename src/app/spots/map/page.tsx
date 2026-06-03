import SpotsExplorer from "@/components/SpotsExplorer";

type SpotsMapPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SpotsMapPage({ searchParams }: SpotsMapPageProps) {
  const { q } = await searchParams;
  return <SpotsExplorer query={q} />;
}
