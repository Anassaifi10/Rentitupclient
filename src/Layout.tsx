import type React from "react";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-100">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
