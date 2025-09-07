import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="max-w-6xl m-auto p-2 md:p-5">
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  );
}
