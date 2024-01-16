import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { getServerSession } from "next-auth";
import SessionProvider from "../components/provider/SessionProvider"
import "./globals.css";
import {ThemeProvider} from "../components/provider/ThemeProvider"
import { Toaster } from "@/components/ui/toaster"

const poppins = Poppins({ subsets: ["latin"], weight: ["200","300","400","500"], style: "normal" });

export const metadata: Metadata = {
  title: "Food Ordering App",
  description: "Food Ordering Website Using Next JS",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={poppins.className}>
        <SessionProvider session={session}>
        <main>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster/>
          {children}
          </ThemeProvider>
        </main>
        </SessionProvider>
      </body>
    </html>
  );
}
