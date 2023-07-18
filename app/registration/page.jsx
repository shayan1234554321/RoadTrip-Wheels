'use client'
import React from 'react';
import styles from './registration.module.css'
import { RoundedButton } from '@/components/buttons';
import { useState } from 'react';
import Image from 'next/image';
import logo from '@/assets/images/logo-white.png';
import { useStateContext } from '@/context/StateContext';
// import { api } from '@/utilities/common';

const Registration = () => {
   const [login, setLogin] = useState(true);
   const { username, setUsername } = useStateContext();
   const handleSingup = () => {
    setLogin(!login);
   }

   const handleSingin = () => {
    setLogin(!login);
    }
    const handleSinginSubmit = async (e) => {
      e.preventDefault();
      const formUsername = document.getElementById('username').value;
      try  {
        const response =  await fetch(`http://127.0.0.1:3000/Api/v1/users/${formUsername}`)
        const data = await response.json();
        const user = await data.data
        setUsername(user.username);
        console.log(user)
        console.log(username)
        
      } catch (error) {
        console.log(error)
      }
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
            {login && 
              <form className={styles.form}>
                <input className={styles.input} id='username' type="text" placeholder="username"/>
                <input className={styles.submit} type="submit" onClick={handleSinginSubmit} placeholder="Sign in"/>
              </form>
            }
          </div>
        </div>
    );
}

export default Registration;