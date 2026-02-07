import Header from '@/components/layout/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--main-bg)]">
      <Header activeNav="dashboard" />
      <main className="max-w-[1440px] mx-auto px-[60px] py-8">{children}</main>
    </div>
  );
}
