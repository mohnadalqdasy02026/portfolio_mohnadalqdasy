import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { DataProvider } from "@/contexts/DataContext";
import { AdminShellWrapper } from "@/components/admin/AdminShellWrapper";

export const metadata: Metadata = {
  title: "Mohannad Al-Qudsi | Software Engineer & Full Stack Developer",
  description: "Professional portfolio of Mohannad Mohammed Al-Qudsi - Software Engineer specializing in Desktop Application Development, ERP Systems, and Full Stack Development.",
  keywords: ["Software Engineer", "Full Stack Developer", "C#", ".NET", "DevExpress", "SQL Server", "Portfolio", "Yemen"],
  authors: [{ name: "Mohannad Mohammed Al-Qudsi" }],
  openGraph: {
    title: "Mohannad Al-Qudsi | Software Engineer",
    description: "Professional portfolio of a passionate software engineer",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohannad Al-Qudsi | Software Engineer",
    description: "Professional portfolio of a passionate software engineer",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <LanguageProvider>
            <DataProvider>
              <AdminShellWrapper>
                {children}
              </AdminShellWrapper>
            </DataProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
