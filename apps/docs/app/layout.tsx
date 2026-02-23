import './globals.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | AppShell',
    default: 'AppShell',
  },
  description: 'Mobile-first app shell components for React',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
