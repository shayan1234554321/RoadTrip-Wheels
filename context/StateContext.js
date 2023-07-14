"use client";

import React, { createContext, useContext, useState } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [username, setUsername] = useState("a great name");
  const [ showNavigation , setShowNavigation ] = useState(true)

  return (
    <Context.Provider value={{ username, setUsername , showNavigation }}>
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
