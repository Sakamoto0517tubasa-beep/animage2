type PageContainerProps = {
  children: React.ReactNode;
};

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14 sm:py-20">{children}</div>
  );
}
