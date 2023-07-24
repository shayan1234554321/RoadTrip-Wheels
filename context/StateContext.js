"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
const Context = createContext();
import { Api } from "@/utilities/common";
import axios from "axios";


export const StateContext = ({ children }) => {
  const [username, setUsername] = useState("a great name");
  const [fullName, setFullName] = useState("a great name");
  const [loggedIn, setLoggedIn] = useState(null);
  const [userId, setUserId] = useState(0);
  const [cars, setCars] = useState([]);

useEffect(async () => {
  if(localStorage.getItem("username")) {
    setUsername(JSON.parse(localStorage.getItem("username")));
    setLoggedIn(true);
    try {
      const response = await axios.get(Api.getCars)
      setCars(await response.data.data)
    } catch (error) {
      console.log(error)
    }
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
