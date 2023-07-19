'use client'
import React from "react";
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
