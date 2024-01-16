import type { Metadata } from "next";
import AdminHeader from "../../components/layout/AdminHeader";
import AdminSidebar from "../../components/layout/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Food Ordering Website Dashboard",
};
export default async function Layout({ children }: {
  
  children: React.ReactNode;
})
 {
  
  return (
    <>
      <main className="flex gap-4">
        <div className="max-w-[15vw] min-w-min border border-t-0 border-l-0 h-screen">
          <AdminSidebar />
        </div>
        <div className="p-5 w-[80vw]"><AdminHeader/>{children}</div>
      </main>
    </>
  );
}
