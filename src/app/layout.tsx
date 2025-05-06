
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { LanguageProvider } from '@/context/language-context';
import { ThemeProvider } from "@/components/theme-provider"; // Import ThemeProvider

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
    // Add suppressHydrationWarning due to next-themes
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased flex flex-col',
          GeistSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <Navbar />
            <main className="flex-grow pt-16"> {/* Add padding-top to avoid content overlap */}
              {children}
            </main>
            <Footer />
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
