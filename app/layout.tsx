import './globals.css';

import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';

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
  // src: [
  //   {
  //     path: '../public/fonts/ClashDisplay-Bold.woff2',
  //     weight: '700',
  //     style: 'normal'
  //   }
  // ],
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
        {children}
        <Cursor />
      </body>
    </html>
  );
}
