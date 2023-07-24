"use client"

import { useStateContext } from "@/context/StateContext";
import React, { useState } from "react";
import styles from "./layout.module.css";
import { colors } from "@/utilities/common";
import logo from "../assets/images/logo.png";
import github from "../assets/images/github.png";
import list from "../assets/images/list.png";
import listWhite from "../assets/images/listWhite.png";
import Link from "next/link";
import { RoundedButton } from "@/components/buttons";
import { useRouter, usePathname } from "next/navigation";

const Navigation = () => {
  const { setUser, setLoggedIn } = useStateContext();
  const [menuShow, setMenuShow] = useState(false);
  const router = useRouter();

  const navLinks = [
    {
      name: "VEHICLES",
      selected: usePathname() === "/home",
      linkName: "/home",
      handleClick: () => {
        setMenuShow(false);
      },
    },
    {
      name: "RESERVATION",
      selected: usePathname() === "/reservation",
      linkName: "/reservation",
      handleClick: () => {
        setMenuShow(false);
      },
    },
    {
      name: "MY RESERVATION",
      selected: usePathname() === "/my-reservations",
      linkName: "/my-reservations",
      handleClick: () => {
        setMenuShow(false);
      },
    },
    {
      name: "ADD / REMOVE CAR",
      selected: usePathname() === "/add-remove-car",
      linkName: "/add-remove-car",
      handleClick: () => {
        setMenuShow(false);
      },
    },
  ];

  const handleLogout = () => {
    setUser({})
    localStorage.removeItem("user");
    setLoggedIn(false);
    router.push("/");
  };

  return (
    <>
      {usePathname() !== "/" && (
        <>
          <div className={styles.logoutButton}>
            <RoundedButton color={colors.green} onClick={handleLogout} inverted={usePathname() === "/reservation"} >
              LOGOUT
            </RoundedButton>
          </div>
          <div
            className={styles.menuContainer}
            style={{ left: menuShow ? "0" : "-220px" }}
          >
            <nav className={styles.nav}>
              <div>
                <img src={logo.src} alt="logo" />
                <ul className={styles.navMenu}>
                  {navLinks.map((item) => (
                    <li
                      key={item.linkName}
                      className={`${item.selected && styles.selected}`}
                    >
                      <Link href={item.linkName} onClick={item.handleClick}>
                        <div>{item.name}</div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <img
                  src={github.src}
                  alt="github icon"
                  className={styles.github}
                />
                <h6>© LICENSE BY MIT</h6>
              </div>
            </nav>
            <div
              className={styles.mobileMenu}
              onClick={() => {
                setMenuShow(!menuShow);
              }}
            >
              <img
                src={
                  usePathname() === "/reservation" ? listWhite.src : list.src
                }
                alt="mobile menu icon"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navigation;
