import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Damiz Auto Care | Ohio premium Auto Repair',
  description: 'Expert care for Toyota, Lexus, Honda, and Nissan. Body repair, painting, and maintenance.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased text-white bg-[#050505] overflow-x-hidden`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
