import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { getServerSession } from "next-auth";
import SessionProvider from "./components/SessionProvider"
import "./globals.css";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";

const poppins = Poppins({ subsets: ["latin"], weight: "300", style: "normal" });

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
        <main className=" max-w-6xl m-auto p-6">
          <Navbar />
          {children}
        </main>
        </SessionProvider>
        <Footer/>
      </body>
    </html>
  );
}
