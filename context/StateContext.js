"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
const Context = createContext();
import { Api } from "@/utilities/common";
import axios from "axios";

export const StateContext = ({ children }) => {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(0);
  const [cars, setCars] = useState([]);

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
        userId,
        setUserId,
        cars,
        setCars,
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
