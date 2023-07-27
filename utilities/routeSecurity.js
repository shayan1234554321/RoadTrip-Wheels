"use client";
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";

const RouteSecurity = ({ children }) => {
  const { push } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/" && !localStorage.getItem("user")) {
      toast.error("Please login first");
      push("/");
    }
    if (pathname === "/" && localStorage.getItem("user")) {
      toast.success("You are already logged In");
      push("/home");
    }
  }, [pathname]);

  return <div className="mainBodyDiv">{children}</div>;
};

RouteSecurity.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RouteSecurity;
