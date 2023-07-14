"use client";
import React from "react";
import { useStateContext } from "@/context/StateContext";

export default function Login() {
  const { username } = useStateContext();

  return <main> {username} </main>;
}
