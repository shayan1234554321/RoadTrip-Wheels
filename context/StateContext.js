"use client";

import React, { createContext, useContext, useState } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [username, setUsername] = useState("a great name");

  return (
    <Context.Provider value={{ username, setUsername }}>
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
