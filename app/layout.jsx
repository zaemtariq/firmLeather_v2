"use client";

import "./globals.css";
import { Footer } from "@/components/Nav_Footer/Footer";
import { Navbar } from "@/components/Nav_Footer/Navbar";
import { usePathname } from "next/navigation";
import GeminiAssistant from "../components/gemini/GeminiAssistant";

const RootLayout = ({ children }) => {
  const pathname = usePathname();

  // Logic: Is the current page NOT the home page?
  const isNotHomePage = pathname !== "/";
  return (
    <html>
      <body>
        <Navbar />
        {isNotHomePage && <div className="h-18 md:h-18 w-full"></div>}
        <div className="min-h-screen  flex flex-col font-sans text-stone-800 ">
          <main>{children}</main>
          <Footer />
          <GeminiAssistant />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
