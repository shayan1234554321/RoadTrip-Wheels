'use client'
import React from 'react';
import styles from './registration.module.css'
import { RoundedButton } from '@/components/buttons';
import { useState } from 'react';
import Image from 'next/image';
import logo from '@/assets/images/logo-white.png';
import { useStateContext } from '@/context/StateContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from "react-hot-toast";
import { Api } from '@/utilities/common';

const Registration = () => {
   const [login, setLogin] = useState(true);
   const { username, setUsername, loggedIn, setLoggedIn } = useStateContext();
   const { push } = useRouter();
   const handleSingup = () => {
    setLogin(!login);
   }

   const handleSingin = () => {
    setLogin(!login);
    }
    const handleSinginSubmit = async (e) => {
      e.preventDefault();
      const formUsername = document.getElementById('username').value;
      if (formUsername === '') {
        toast.error("Please enter a username");
      }
      try  {
        const response =  await axios.get(Api.getUser(formUsername))
        const data = await response.data;
        const user = await data.data
        setUsername(user.username);
        setLoggedIn(true);
        toast.success(`Welcome ${user.username}`);
        push('/');
      } catch (error) {
        if(formUsername !== '') {
          toast.error(error.response.data.message);
        }else {
          toast.error("Something went wrong");
        }
      }
    }

    const handleLogout = () => {
      setUsername('');
      setLoggedIn(false);
      toast.success(`You have been logged out`);
    }
    return (
        <div className={styles.container}>
          <div className={styles.header}>
            <Image src={logo} alt="logo" className={styles.logo}/>
            {login && 
              <RoundedButton  onClick = {handleSingup} inverted={true} color={'var(--orange)'}>SIGN UP</RoundedButton>
            }
            {!login && 
              <RoundedButton onClick = {handleSingin}  inverted={true} color={'var(--orange)'}>SIGN IN</RoundedButton>
            }
          </div>
          <div className={styles.formHolder}>
            <h1 className={styles.title}>THE ROADTRIP WHEELS</h1>
            {login && !loggedIn && 
              <form className={styles.form}>
                <input className={styles.input}  id='username' type="text" placeholder="username" required/>
                <input className={styles.submit} type="submit" onClick={handleSinginSubmit} value="SIGNIN"/>
              </form>
            }
            {login && loggedIn && 
              <div className={styles.form}>
                <p className={styles.logoutText}>You are already logged in as: {username}</p>
                <button className={styles.submit} onClick={handleLogout}>Log out</button>
              </div>
              }
          </div>
        </div>
    );
}

export default Registration;