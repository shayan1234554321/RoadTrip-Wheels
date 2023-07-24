"use client";
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useStateContext } from "@/context/StateContext";
import { toast } from "react-hot-toast";
import PropTypes from 'prop-types';


const RouteSecurity = ({ children }) => {
  const { loggedIn } = useStateContext();
  const { push } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/" && !loggedIn) {
      toast.error("Please login first");
      push("/");
    }
    if (pathname === "/" && loggedIn) {
      toast.success("You are already logged In");
      push("/home");
    }
    console.log(pathname);
    console.log(loggedIn);
  }, [loggedIn, pathname]);

  return <div className="mainBodyDiv">{children}</div>;
};

RouteSecurity.propTypes = {
  children: PropTypes.node.isRequired
};

export default RouteSecurity;
