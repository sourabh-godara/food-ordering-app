import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";

export default function Layout({ children }: {
  children: React.ReactNode;
}) {
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
