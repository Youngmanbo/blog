"use client"
import Link from 'next/link';
import styles from "./navbar.module.css";
import {userState} from "../_lib/atoms";
import {useRecoilValue} from "recoil";
import { useEffect } from 'react';
import { useSession } from "next-auth/react";
import LoginBtn from './LoginButton';
import LoginCompleted from './LoginCompleted';

export default function NavBar() {
    const { data:session, status } = useSession()
    console.log(session);
    return(
        <header className={styles.navContainer}>
          <div className={styles.leftSectionWraper}>
            <Link href="/" >Home</Link>
          </div>
          <div className={styles.rightSectionWraper}>
            <div className={styles.itemWraper}>
              <div className={styles.search}>
              </div>
              {status==='authenticated'?
                <LoginCompleted session={session}></LoginCompleted>:
                <LoginBtn className={styles.loginBtn}></LoginBtn>}
            </div>
          </div>
        </header>
    )
}