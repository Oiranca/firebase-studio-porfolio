
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans'; // Correct import for Geist Sans
// Removed GeistMono import as it's not installed and not currently used
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'PersonaFlow - Your Portfolio',
  description: 'My personal portfolio showcasing projects and skills.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          GeistSans.variable
          // Removed GeistMono.variable as the font is not imported
        )}
      >
        <Navbar />
        <main className="flex-grow">
           {children}
        </main>
        <Footer />
        <Toaster /> {/* Add Toaster here */}
      </body>
    </html>
  );
}
