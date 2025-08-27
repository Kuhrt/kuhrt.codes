import './globals.css';

import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';

import Footer from '@/components/layouts/Footer';
import NavBar from '@/components/navigation/NavBar';
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
  description: 'Web Developer'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontInter.variable} ${fontJetBrainsMono.variable} ${fontClashDisplay.variable} antialiased cursor-none`}
      >
        <header className="fixed top-0 left-0 right-0 z-50">
          <NavBar />
        </header>
        {children}
        <Footer />
        <Cursor />
      </body>
    </html>
  );
}
