import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocaleProvider from "@/components/LocaleProvider";
import LanguageToggle from "@/components/LanguageToggle";
import { AuthProvider } from "@/lib/auth-context";

export const metadata: Metadata = {
  formatDetection: { telephone: false, date: false, email: false, address: false },
  title: {
    default: "Alex Rivera — Full-Stack Developer & Creative Technologist",
    template: "%s | Alex Rivera",
  },
  description:
    "Full-Stack Developer & Creative Technologist based in San Francisco. Building fast, beautiful, and purposeful digital products.",
  openGraph: {
    title: "Alex Rivera — Full-Stack Developer & Creative Technologist",
    description:
      "Full-Stack Developer & Creative Technologist based in San Francisco. Building fast, beautiful, and purposeful digital products.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[var(--background)] text-[var(--foreground)] font-sans antialiased">
        <AuthProvider>
          <LocaleProvider>
            <LanguageToggle />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </LocaleProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
