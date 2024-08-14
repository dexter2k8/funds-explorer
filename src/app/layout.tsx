import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CSSProperties } from "react";

const inter = Inter({ subsets: ["latin"] });

const globalFont = {
  "--inter": inter.style.fontFamily,
};

export const metadata: Metadata = {
  title: "Funds Explorer",
  description: "Dashboard application for investment funds analytics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={globalFont as CSSProperties}>
        {children}
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          transition={Slide}
          hideProgressBar
        />
      </body>
    </html>
  );
}
