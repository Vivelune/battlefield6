import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Battlefield 6 — Pre-Order Now | Exclusive 25% Coupon',
  description:
    'Pre-order Battlefield 6 and get 25% off all new releases. Use coupon code BF6NEW25 at checkout. Experience next-gen destruction, 128-player battles, and advanced warfare.',
  keywords: [
    'Battlefield 6',
    'BF6',
    'pre-order',
    'coupon',
    'discount',
    'FPS game',
    'new release',
    '25% off',
  ],
  authors: [{ name: 'Battlefield 6' }],
  openGraph: {
    title: 'Battlefield 6 — Pre-Order Now | Exclusive 25% Coupon',
    description:
      'The Next Chapter of War. Pre-order Battlefield 6 and save 25% with code BF6NEW25.',
    type: 'website',
    siteName: 'Battlefield 6',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Battlefield 6 — Pre-Order Now',
    description: 'Get 25% off new releases with code BF6NEW25.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0e17',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-rajdhani bg-[#0a0e17] text-white antialiased">
        {children}
      </body>
    </html>
  );
}