"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
const Context = createContext();

export const StateContext = ({ children }) => {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        loggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </Context.Provider>
  );
};

StateContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useStateContext = () => useContext(Context);
