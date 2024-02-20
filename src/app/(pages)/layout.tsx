import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className='max-w-6xl m-auto p-2 md:p-5'>
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  );
}
