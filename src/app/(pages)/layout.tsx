import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <div className="max-w-6xl m-auto p-5">
      <Navbar />
        {children}
        <Footer />
      </div>
    </>
  );
}
