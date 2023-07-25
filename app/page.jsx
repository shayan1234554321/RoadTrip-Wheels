"use client";
import React from "react";
import styles from "./registration.module.css";
import { RoundedButton } from "@/components/buttons";
import { useState } from "react";
import Image from "next/image";
import logo from "@/assets/images/logo-white.png";
import { useStateContext } from "@/context/StateContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Api } from "@/utilities/common";
import car from '@/assets/images/car-background.png'

const Registration = () => {
  const [login, setLogin] = useState(true);
  const [formUsername, setFormUsername] = useState("");
  const [formFullname, setFormFullname] = useState("");
  const { username, setUsername, loggedIn, setLoggedIn, setUserId } = useStateContext();
  const { push } = useRouter();

  const handleToggle = () => {
    setLogin(!login);
  };

  const handleSigninSubmit = async (e) => {
    e.preventDefault();
    if (formUsername === "") {
      toast.error("Please enter a username");
    }
    try {
      const response = await axios.get(Api.getUser(formUsername));
      const data = await response.data;
      const user = await data.data;
      setUsername(user.username);
      setUserId(user.id);
      setLoggedIn(true);
      toast.success(`Welcome ${user.username}`);
      localStorage.setItem("username", JSON.stringify(user.username));
      localStorage.setItem("userId", JSON.stringify(user.id));
      push("/home");
    } catch (error) {
      if (formUsername !== "") {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const handleLogout = () => {
    setUsername("");
    setLoggedIn(false);
    toast.success(`You have been logged out`);
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
  };

  const handleSignupSubmit = async (e) => {
    let formData;
    e.preventDefault();
    if (formUsername === "" || formFullname === "") {
      toast.error("Please fill in all fields");
    } else {
      formData = {
        username: formUsername,
        full_name: formFullname,
      };
    }
    try {
      const response = await axios.post(Api.createUser, formData);
      if (response.status == 200) {
        toast.success("User created successfully");
        setUsername(formData.username);
        setLoggedIn(true);
        push("/home");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image src={logo} alt="logo" className={styles.logo} />
        {login && (
          <RoundedButton
            onClick={handleToggle}
            inverted={true}
            color={"var(--orange)"}
          >
            SIGN UP
          </RoundedButton>
        )}
        {!login && (
          <RoundedButton
            onClick={handleToggle}
            inverted={true}
            color={"var(--orange)"}
          >
            SIGN IN
          </RoundedButton>
        )}
      </div>
      <div className={styles.formHolder}>
        <h1 className={styles.title}>THE ROADTRIP WHEELS</h1>
        {login && !loggedIn && (
          <form className={styles.form}>
            <input
              className={styles.input}
              onChange={(e) => setFormUsername(e.target.value)}
              type="text"
              placeholder="username"
              value = {formUsername}
              required
            />
            <input
              className={styles.submit}
              type="submit"
              onClick={handleSigninSubmit}
              value="SIGNIN"
            />
          </form>
        )}
        {login && loggedIn && (
          <div className={styles.form}>
            <p className={styles.logoutText}>
              You are already logged in as: {username}
            </p>
            <button className={styles.submit} onClick={handleLogout}>
              Log out
            </button>
          </div>
        )}
        {!login && !loggedIn && (
          <form className={styles.form}>
            <input
              className={styles.input}
              onChange={(e) => setFormFullname(e.target.value)}
              type="text"
              placeholder="Full name"
              value= {formFullname}
              required
            />
            <input
              className={styles.input}
              onChange={(e) => setFormUsername(e.target.value)}
              type="text"
              placeholder="username"
              value= {formUsername}
              required
            />
            <input
              className={styles.submit}
              type="submit"
              onClick={handleSignupSubmit}
              value="SIGNUP"
            />
          </form>
        )}
        {!login && loggedIn && (
          <div className={styles.form}>
            <p className={styles.logoutText}>
              You are already logged in as: {username}, you need to logout to
              register a new user
            </p>
            <button className={styles.submit} onClick={handleLogout}>
              Log out
            </button>
          </div>
        )}
      </div>
      <div className={styles.bgImage}>
        <img src={car.src} alt="background image" />
      </div>
    </div>
  );
};

export default Registration;
