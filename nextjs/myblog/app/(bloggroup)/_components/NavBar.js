"use client"
import Link from 'next/link';
import styles from "./navbar.module.css";
import {userState} from "../_lib/atoms";
import {useRecoilValue} from "recoil";
import { useEffect } from 'react';

export default function NavBar() {


    return(
        <header className={styles.navContainer}>
          <div className={styles.leftSectionWraper}>
            <Link href="/" >Home</Link>
          </div>
          <div className={styles.rightSectionWraper}>
            <div className={styles.itemWraper}>
              <div className={styles.search}>
              </div>
              <Link href="/register/" className={styles.loginBtn}>로그인</Link>
            </div>
          </div>
        </header>
    )
}