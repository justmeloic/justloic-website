import type { Metadata } from "next";
import { Newsreader, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
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
  title: "Loïc Muhirwa — AI Solutions, Mathematics & Art",
  description:
    "Personal website and portfolio of Loïc Muhirwa. AI Solutions at Google, former ML lead for the Government of Canada, researcher in computer vision & neuroimaging.",
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
