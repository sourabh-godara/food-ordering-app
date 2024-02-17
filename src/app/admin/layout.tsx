import type { Metadata } from "next";
import AdminHeader from "../../components/layout/AdminHeader";
import AdminSidebar from "../../components/layout/AdminSidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

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
  return <><h1>You are not authorized to view this page!</h1></>
}
