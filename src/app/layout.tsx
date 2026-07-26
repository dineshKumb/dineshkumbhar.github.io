import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300","400","500","600","700","800","900"],
});

const interDisplay = Inter({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400","500","600","700","800","900"],
});

const jetBrainsMono = Inter({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400","500","600","700"],
});

export const metadata: Metadata = {
  title: "Dinesh Kumbhar | Data Engineer",
  description:
    "Portfolio of Dinesh Kumbhar - Data Engineer specializing in Microsoft Fabric, PySpark, Delta Lake, and building scalable data platforms.",
  keywords: [
    "Data Engineer", "Microsoft Fabric", "PySpark", "Delta Lake",
    "Databricks", "AWS", "Data Lakehouse", "Dinesh Kumbhar",
  ],
  authors: [{ name: "Dinesh Kumbhar" }],
  openGraph: {
    title: "Dinesh Kumbhar | Data Engineer",
    description: "Data Engineer specializing in Microsoft Fabric, PySpark, Delta Lake.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${interDisplay.variable} ${jetBrainsMono.variable}`} suppressHydrationWarning>
      <body className="noise-overlay custom-scrollbar">{children}</body>
    </html>
  );
}
