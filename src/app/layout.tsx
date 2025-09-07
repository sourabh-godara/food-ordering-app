import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { getServerSession } from "next-auth";
import SessionProvider from "../components/provider/SessionProvider";
import "./globals.css";
import { ThemeProvider } from "../components/provider/ThemeProvider";
import { authOptions } from "@/lib/authOptions";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  style: "normal",
});

export const metadata: Metadata = {
  title: "Food Ordering App",
  description: "Food Ordering Website Using Next JS",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <SessionProvider session={session}>
          <main>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
