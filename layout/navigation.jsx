import { useStateContext } from '@/context/StateContext';
import React from 'react'
import styles from './layout.module.css'
import { colors } from '@/utilities/common';
import logo from '../assets/images/logo.png'
import github from '../assets/images/github.png'
import Link from 'next/link';
import { RoundedButton } from '@/components/buttons';

const Navigation = () => {

    const { showNavigation } = useStateContext();

  return (
    <>
        {
            showNavigation &&
            <nav>
                <div>
                    <div>
                        <img src={logo.src} alt="logo" />
                        <ul className={styles.navMenu} >
                            <li><Link href="#" >VEHICLES</Link></li>
                            <li><Link href="#" >RESERVATION</Link></li>
                            <li><Link href="#" >MY RESERVATION</Link></li>
                            <li><Link href="#" >ADD / REMOVE CAR</Link></li>
                        </ul>
                    </div>
                    <div>
                        <img src={github.src} alt="github icon" className={styles.github} />
                        <h5>© LICENSE BY MIT</h5>
                    </div>
                </div>
                <RoundedButton color={colors.green} >
                    LOGOUT
                </RoundedButton>
            </nav>
        }
    </>
  )
}

export default Navigation