import Link from "next/link";
import PageContainer from "@/components/PageContainer";
import RegionTable from "@/components/RegionTable";

export default function ComparePage() {
  return (
    <PageContainer>
      <div className="space-y-12">
        <div>
          <h1 className="section-title">地域比較</h1>
          <div className="gold-accent-line" />
          <p className="section-subtitle">
            5つの地域の家賃・生活費・仕事の多さ・住みやすさを比較できます。
          </p>
        </div>

        <RegionTable />

        <Link
          href="/"
          className="btn-primary inline-block px-8 py-4 tracking-wide"
        >
          シミュレーションを始める
        </Link>
      </div>
    </PageContainer>
  );
}
