import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import './globals.css'
import ThemeRegistry from "@/components/ThemeRegistry";

export const metadata: Metadata = {
  title: "Open Flow",
  description: "A free, open source AAC app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Header />
          <main style={{ marginTop: '100px', paddingBottom: '72px' }}>
            {children}
          </main>
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}