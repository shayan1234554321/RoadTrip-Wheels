import React from "react";
import { usePathname } from 'next/navigation'
import "./globals.css";
import { StateContext } from "@/context/StateContext";
import Navigation from "@/layout/navigation";
import { Inter } from "next/font/google";
import PropTypes from "prop-types";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  const router = usePathname();
  if (router == "/registration") {
    return(
      <html lang="en">
      <body className={inter.className}>
          <StateContext>
            <div className="mainBodyDiv" >
              {children}
              <Toaster />
            </div>
          </StateContext>
        </body>
    </html>
    );
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <StateContext>
          <div className="mainBodyDiv">
            <Navigation />
            {children}
            <Toaster />
          </div>
        </StateContext>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
