import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { auth } from "@/lib/auth";

import './globals.css'
import ThemeRegistry from "@/components/ThemeRegistry";
import { headers } from "next/headers";
import connectDB from "@/lib/mongoose";
import UserSettings from "@/models/UserSettings";

export const metadata: Metadata = {
  title: "Open Flow",
  description: "A free, open source AAC app",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });
  let initialMode: "light" | "dark" = "light";
  if(session){
    await connectDB();
    const rawSettings = await UserSettings.findOne({ userId: session.user.id });
    if(rawSettings) {
      const settings = JSON.parse(JSON.stringify(rawSettings));
      initialMode = settings.darkModeOnPref ? "dark" : "light";
      
    }
  }
  return (
    <html lang="en">
      <body>
        <ThemeRegistry initialMode={initialMode} userSignedIn={!!session}>
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