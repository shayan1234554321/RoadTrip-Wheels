"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
const Context = createContext();


export const StateContext = ({ children }) => {
  const [username, setUsername] = useState("a great name");
  const [fullName, setFullName] = useState("a great name");
  const [loggedIn, setLoggedIn] = useState(null);

useEffect(() => {
  if(localStorage.getItem("username")) {
    setUsername(JSON.parse(localStorage.getItem("username")));
    setLoggedIn(true);
  }
}, []);

  return (
    <Context.Provider
      value={{
        username,
        setUsername,
        fullName,
        setFullName,
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
