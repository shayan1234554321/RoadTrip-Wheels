"use client";
import { useStateContext } from "@/context/StateContext";

export default function Login() {
  const { username } = useStateContext();

  return <main> {username} </main>;
}
