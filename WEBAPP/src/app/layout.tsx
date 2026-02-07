import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Masjid App - Admin Dashboard',
  description: 'NWK Muslim Association Admin Dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
