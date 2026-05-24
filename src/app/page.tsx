import HeroSection from "@/components/HeroSection";
import PageContainer from "@/components/PageContainer";
import SimulationForm from "@/components/SimulationForm";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PageContainer>
        <div className="mb-12">
          <h2 className="section-title">あなたの条件を入力してください</h2>
          <div className="gold-accent-line" />
          <p className="section-subtitle">
            入力内容をもとに、日本での就労・生活イメージを詳細にシミュレーションします。
          </p>
        </div>

        <div className="glass-card p-8 sm:p-10">
          <SimulationForm />
        </div>
      </PageContainer>
    </>
  );
}
