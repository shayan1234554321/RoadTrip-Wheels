"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
const Context = createContext();

export const StateContext = ({ children }) => {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(0);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
      setLoggedIn(true)
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
        reservations,
        setReservations
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
