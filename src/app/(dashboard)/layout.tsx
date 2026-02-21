'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';

function getActiveNav(pathname: string): string {
  if (pathname.startsWith('/prayer-management')) return 'prayer';
  if (pathname.startsWith('/events')) return 'events';
  if (pathname.startsWith('/campaigns')) return 'campaigns';
  if (pathname.startsWith('/settings')) return 'settings';
  return 'dashboard';
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const activeNav = getActiveNav(pathname);

  return (
    <div className="min-h-screen bg-[var(--main-bg)]">
      <Header activeNav={activeNav} />
      <main className="max-w-[1440px] mx-auto px-4 lg:px-[60px] py-8">{children}</main>
    </div>
  );
}
