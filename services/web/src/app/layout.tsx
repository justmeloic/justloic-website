import type { Metadata } from "next";
import { Newsreader, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Loïc",
    template: "%s — Loïc",
  },
  description:
    "I design and develop AI solutions at Google. Before joining Google, I led a team of Machine Learning Engineers, Data Engineers and Data Scientists for the Government of Canada.",
  keywords: [
    "Loïc Muhirwa",
    "AI",
    "Machine Learning",
    "Google",
    "Computer Vision",
    "Neuroimaging",
    "Statistics Canada",
    "Mathematics",
  ],
  authors: [{ name: "Loïc Muhirwa", url: "https://justloic.com" }],
  creator: "Loïc Muhirwa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${plusJakartaSans.variable} ${newsreader.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#FAFAF9] dark:bg-[#0F0E0E] text-[#1C1917] dark:text-[#E7E5E4]`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <div className="min-h-screen flex flex-col bg-[#FAFAF9] dark:bg-[#0F0E0E] transition-colors duration-300">
            <Navbar />
            <main className="flex-1 w-full max-w-5xl mx-auto px-6">{children}</main>
            <div className="w-full max-w-5xl mx-auto px-6">
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
