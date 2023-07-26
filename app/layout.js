'use client'
import React from "react";
import "./globals.css";
import { StateContext } from "@/context/StateContext";
import Navigation from "@/layout/navigation";
import { Inter } from "next/font/google";
import PropTypes from "prop-types";
import { Toaster } from "react-hot-toast";
import RouteSecurity from "@/utilities/routeSecurity";
const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StateContext>
          <RouteSecurity>
            <Navigation />
            {children}
            <Toaster />
          </RouteSecurity>
        </StateContext>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RootLayout