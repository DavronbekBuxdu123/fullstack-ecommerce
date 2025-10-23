import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "DavaShop-Best Clothes",
  description: "DavaShop is the best place to find the best clothes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={` antialiased`}>
          <div>
            <div className="mx-auto p-4 sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-6xl">
              <Navbar />
              {children}
            </div>
            <Footer />
            <ToastContainer position="bottom-right" />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
