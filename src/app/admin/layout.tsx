import type { Metadata } from "next";
import AdminHeader from "./layout/AdminHeader";
import AdminSidebar from "./layout/AdminSidebar";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { authOptions } from "@/lib/authOptions";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Food Ordering Website Dashboard",
};
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session?.user.role === "admin") {
    return (
      <>
        <Toaster position="top-center" richColors />
        <main className="flex gap-4">
          <div className="max-w-[15vw] min-w-min border border-t-0 border-l-0 h-screen">
            <AdminSidebar />
          </div>
          <div className="p-5 w-[80vw]">
            <AdminHeader />
            {children}
          </div>
        </main>
      </>
    );
  }
  return notFound();
}
