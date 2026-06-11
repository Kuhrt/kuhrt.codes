import './globals.css';

import { GoogleTagManager } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';

import Footer from '@/components/layouts/Footer';
import NavBar from '@/components/navigation/NavBar';
import Providers from '@/components/providers/Providers';
import Cursor from '@/components/ui/Cursor';

const fontInter = Inter({
  variable: '--font-inter',
  subsets: ['latin']
});

const fontJetBrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin']
});

const fontClashDisplay = localFont({
  display: 'swap',
  src: '../public/fonts/ClashDisplay-Variable.woff2',
  variable: '--font-clash-display'
});

export const metadata: Metadata = {
  title: 'Kuhrt.Codes',
  description:
    'Kuhrt Cowan — senior software engineer. I build software that holds up after launch: architecture, UX, and production engineering. Lubbock, Texas.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        <GoogleTagManager gtmId="GTM-5BG3QCGM" />
      </head>
      <body
        className={`${fontInter.variable} ${fontJetBrainsMono.variable} ${fontClashDisplay.variable} antialiased cursor-none bg-background`}
      >
        <header className="fixed top-0 left-0 right-0 z-50">
          <NavBar />
        </header>
        <Providers>
          {children}
          <Footer />
        </Providers>
        <Cursor />
      </body>
    </html>
  );
}
